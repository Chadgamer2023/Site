const fs = require('fs');
const path = require('path');

// Define source and destination directories
const srcDir = path.join(__dirname, 'src');
const jsSrcDir = path.join(srcDir, 'js');
const cssSrcDir = path.join(srcDir, 'css');
const distDir = path.join(__dirname, 'dist');

// Files to move
const filesToMove = [
    { src: path.join(jsSrcDir, 'firebase.js'), dest: path.join(srcDir, 'firebase.js') },
    { src: path.join(jsSrcDir, 'script.js'), dest: path.join(srcDir, 'script.js') },
    { src: path.join(cssSrcDir, 'style.css'), dest: path.join(srcDir, 'style.css') }
];

// Function to move files
function moveFiles() {
    filesToMove.forEach(file => {
        // Check if the source file exists
        if (fs.existsSync(file.src)) {
            // Move the file to the destination
            fs.rename(file.src, file.dest, err => {
                if (err) {
                    console.error(`Error moving ${file.src}:`, err);
                } else {
                    console.log(`Moved ${file.src} to ${file.dest}`);
                }
            });
        } else {
            console.log(`File not found: ${file.src}`);
        }
    });
}

// Run the move files function
moveFiles();
