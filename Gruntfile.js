module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                files: {
                    './dist/ckcanvas.min.js': './src/ckcanvas.js'
                }
            }
        },
        jshint: {
            app: ['Gruntfile.js', './src/**.js']
        },
        copy: {
            jquery: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: './bower_components/jquery/dist/',
                        src: ['jquery.min.js'],
                        dest: './examples/js/',
                        filter: 'isFile',
                    }
                ]
            },
            palette: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: './bower_components/ckpalette/',
                        src: ['ckpalette.js'],
                        dest: './examples/js/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: './bower_components/ckpalette/',
                        src: ['ckpalette.css'],
                        dest: './examples/css/',
                        filter: 'isFile',
                    }
                ]
            }
        },
        watch: {
            jquery: {
                files: ['./bower_components/jquery*/dist/jquery.min.js'], // jquery 监听
                tasks: ['copy:jquery']
            },
            ckcanvas: {
                files: ['./src/ckcanvas.js'],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 默认被执行的任务列表。

    grunt.registerTask('default', ['copy', 'jshint', 'uglify']);

};
