const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const styleCssPath = path.join(__dirname, 'style.css');
const mainJsPath = path.join(__dirname, 'main.js');

let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Extract and replace CSS
const styleRegex = /<style>([\s\S]*?)<\/style>/;
const styleMatch = htmlContent.match(styleRegex);
if (styleMatch) {
    const cssContent = styleMatch[1].trim();
    fs.writeFileSync(styleCssPath, cssContent, 'utf8');
    htmlContent = htmlContent.replace(styleRegex, '<link rel="stylesheet" href="style.css">');
    console.log('Successfully extracted style.css');
} else {
    console.log('Could not find <style> block');
}

// 2. Extract and replace JS
// The JS block we want is the one without a src attribute (or specifically the main one)
// It looks like <script> // Основной объект конфигурации ... </script>
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let mainScriptContent = null;
let scriptBlockToReplace = null;

while ((match = scriptRegex.exec(htmlContent)) !== null) {
    if (match[1].includes('EmailJS') || match[1].includes('config')) {
        mainScriptContent = match[1].trim();
        scriptBlockToReplace = match[0];
        break;
    }
}

if (mainScriptContent) {
    fs.writeFileSync(mainJsPath, mainScriptContent, 'utf8');
    htmlContent = htmlContent.replace(scriptBlockToReplace, '<script src="main.js"></script>');
    console.log('Successfully extracted main.js');
} else {
    console.log('Could not find main <script> block');
}

// 3. Save index.html
fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
console.log('Successfully updated index.html');
