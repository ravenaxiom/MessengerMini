module.exports = function (grunt) {
    'use strict';
    
    var packagedFiles = ['index.html', 'package.json', 'img/*', 'css/*', 'js/*'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: ['builds/MessengerMini/*'],
        
        compress: {  
            options: {
              archive: 'builds/testapp.zip'
            },
            files: {
                src: packagedFiles,
                flatten: true
            }
        },
        
        nodewebkit: {
            options: {
                platforms: ['win64'],
                buildDir: './builds',
                winIco: 'img/facebook.ico',
            },
            src: packagedFiles
        },
        
        shell: {
            options: {
                stderr: false
            },
            runTest: {
                command: '"../NWJS/nw.exe" <%= compress.options.archive %>'
            },
            runBuild: {
                command: '"builds/MessengerMini/win64/MessengerMini.exe"'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['clean', 'nodewebkit', 'shell:runBuild']);
    grunt.registerTask('test', ['compress', 'shell:runTest']);
    
    grunt.registerTask('default', ['test']);
};