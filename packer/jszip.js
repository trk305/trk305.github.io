const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

async function zipFolderAndFiles(sourceDir, outFile) {
    const zip = new JSZip();
    const items = fs.readdirSync(sourceDir);

    for (const item of items) {
        const fullPath = path.join(sourceDir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // Add folder recursively
            function addFolder(zipFolder, folderPath) {
                const entries = fs.readdirSync(folderPath);
                for (const entry of entries) {
                    const entryPath = path.join(folderPath, entry);
                    const entryStats = fs.statSync(entryPath);
                    if (entryStats.isDirectory()) {
                        addFolder(zipFolder.folder(entry), entryPath);
                    } else {
                        zipFolder.file(entry, fs.readFileSync(entryPath));
                    }
                }
            }
            addFolder(zip.folder(item), fullPath);
        } else {
            // Add root-level files
            zip.file(item, fs.readFileSync(fullPath));
        }
    }

    const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'STORE' });
    fs.writeFileSync(outFile, content);
    console.log('Created ZIP:', outFile);
}

// Usage
zipFolderAndFiles('D:\\trk305.github.io\\الصور', 'D:\\trk305.github.io\\ar.zip');