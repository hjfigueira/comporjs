const path = require('path');

module.exports = {
    entry: './src/Facades.js',
    mode: 'production',
    output: {
        filename: 'compor.js',
        path: path.resolve(__dirname, 'dist'),
    },
};