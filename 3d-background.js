// 3d-background.js
// Initialize Three.js scene
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Отключаем сглаживание на мобильных для экономии ресурсов
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobileDevice });
    
    // Ограничиваем Pixel Ratio до 1.2 для максимальной плавности без потери четкости
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    
    // Geometry - Оптимизированный тор без избыточных полигонов
    const torusRadialSegments = isMobileDevice ? 8 : 12;
    const torusTubularSegments = isMobileDevice ? 32 : 48;
    const geometry = new THREE.TorusGeometry(10, 3, torusRadialSegments, torusTubularSegments);
    const material = new THREE.MeshBasicMaterial({ color: 0x7f9cf5, wireframe: true, transparent: true, opacity: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    
    scene.add(torus);
    
    // Particles - Оптимальное количество частиц (250 вместо 700)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobileDevice ? 100 : 250;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x818cf8,
        transparent: true,
        opacity: 0.5
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse interaction с throttle
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    if (!isMobileDevice) {
        window.addEventListener('mousemove', (event) => {
            targetMouseX = event.clientX / window.innerWidth - 0.5;
            targetMouseY = event.clientY / window.innerHeight - 0.5;
        }, { passive: true });
    }
    
    const clock = new THREE.Clock();
    let isVisible = true;

    // Умная пауза анимации: останавливаем 3D рендер, когда верхняя секция не видна
    const heroSection = document.getElementById('home') || document.querySelector('.services-page-hero');
    if (heroSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        observer.observe(heroSection);
    } else {
        window.addEventListener('scroll', () => {
            isVisible = window.scrollY < window.innerHeight * 1.1;
        }, { passive: true });
    }

    // При сворачивании вкладки полностью глушим рендер (экономия батареи и GPU)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isVisible = false;
        } else if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        } else {
            isVisible = window.scrollY < window.innerHeight;
        }
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isVisible) return; // Полная экономия ресурсов GPU
        
        const elapsedTime = clock.getElapsedTime();
        
        torus.rotation.x += 0.004;
        torus.rotation.y += 0.004;
        torus.rotation.z += 0.004;
        
        particlesMesh.rotation.y = -elapsedTime * 0.03;
        
        // Плавное следование камеры
        camera.position.x += (targetMouseX * 10 - camera.position.x) * 0.05;
        camera.position.y += (-targetMouseY * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 150);
    }, { passive: true });
    
    // Theme switching integration
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const theme = document.documentElement.getAttribute('data-theme');
                if (theme === 'dark') {
                    material.color.setHex(0x818cf8);
                    particlesMaterial.color.setHex(0x818cf8);
                    material.opacity = 0.2;
                } else {
                    material.color.setHex(0x667eea);
                    particlesMaterial.color.setHex(0x667eea);
                    material.opacity = 0.4;
                }
            }
        });
    });
    
    themeObserver.observe(document.documentElement, { attributes: true });
    
    // Initial theme check
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        material.color.setHex(0x818cf8);
        particlesMaterial.color.setHex(0x818cf8);
        material.opacity = 0.2;
    } else {
        material.color.setHex(0x667eea);
        particlesMaterial.color.setHex(0x667eea);
        material.opacity = 0.4;
    }
}
