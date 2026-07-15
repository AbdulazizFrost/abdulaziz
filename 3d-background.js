// 3d-background.js
// Initialize Three.js scene
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Отключаем сглаживание на мобильных для экономии ресурсов
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobileDevice });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2)); // Ограничиваем Pixel Ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    
    // Geometry - Abstract torus wireframe. Уменьшаем количество полигонов для телефонов.
    const torusRadialSegments = isMobileDevice ? 10 : 16;
    const torusTubularSegments = isMobileDevice ? 50 : 100;
    const geometry = new THREE.TorusGeometry(10, 3, torusRadialSegments, torusTubularSegments);
    const material = new THREE.MeshBasicMaterial({ color: 0x7f9cf5, wireframe: true, transparent: true, opacity: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    
    scene.add(torus);
    
    // Particles - Меньше частиц на смартфонах
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobileDevice ? 200 : 700;
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
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    if (!isMobileDevice) {
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });
    }
    
    const clock = new THREE.Clock();
    let isVisible = true;

    // Умная пауза анимации: останавливаем 3D рендер, когда секция Hero не видна на экране
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        observer.observe(heroSection);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isVisible) return; // Экономим батарею и ресурсы GPU
        
        const elapsedTime = clock.getElapsedTime();
        
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.005;
        
        particlesMesh.rotation.y = -elapsedTime * 0.05;
        
        // Smooth camera movement based on mouse
        camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
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
