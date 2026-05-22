const fse = require('fs-extra');
const path = require('path');
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, 'public/lib', 'tinymce'));
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public/lib', 'tinymce'), { overwrite: true });