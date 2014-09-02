/* global module, require */
module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: ['tests/tests.html']
        },
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: ['Gruntfile.js'],
            main: ['js/bootstrap-datepicker.js'],
            locales: ['js/locales/*js']
        },
        jscs: {
            /* grunt-contrib-jscs notes:
                0.1.2 works
                0.1.3 infinite loops on postinstall
                0.1.4 doesn't seem to hit all targets when run via "grunt jscs"
            */
            gruntfile: ['Gruntfile.js'],
            main: ['js/bootstrap-datepicker.js'],
            locales: ['js/locales/*js']
        },
        sass: {
            standalone: {
                files: {
                    '_build/datepicker.standalone.css': 'scss/settings.scss'
                }
            },
            repo: {
                files: {
                    'css/datepicker.css': 'scss/settings.scss'
                }
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true
            },
            main: {
                options: {
                    sourceMap: function(dest){
                        return dest.replace('.min.js', '.js.map');
                    }
                },
                files: {
                    '_build/bootstrap-datepicker.min.js': 'js/bootstrap-datepicker.js',
                    '_build/bootstrap-datepicker.locales.min.js': 'js/locales/*.js'
                }
            },
            locales: {
                files: [{
                    expand: true,
                    cwd: 'js/locales/',
                    src: ['*.js', '!*.min.js'],
                    dest: '_build/locales/',
                    rename: function(dest, name){
                        return dest + name.replace(/\.js$/, '.min.js');
                    }
                }]
            }
        },
        cssmin: {
            all: {
                files: {
                    '_build/datepicker.standalone.min.css': '_build/datepicker.standalone.css'
                }
            }
        },
        clean: ['_build']
    });

    grunt.registerTask('lint', 'Lint all js files with jshint and jscs', ['jshint', 'jscs']);
    // grunt.registerTask('test', 'Lint files and run unit tests', ['lint', 'qunit']);
    grunt.registerTask('finish', 'Prepares repo for commit [lint, sass:repo, screenshots]', ['lint', 'sass:repo', 'screenshots']);
    grunt.registerTask('dist', 'Builds minified files', ['clean', 'sass:repo', 'sass:standalone', 'cssmin', 'uglify']);

    grunt.registerTask('screenshots', 'Rebuilds automated docs screenshots', function(){
        var phantomjs = require('phantomjs').path;

        grunt.file.recurse('docs/_static/screenshots/', function(abspath){
            grunt.file.delete(abspath);
        });

        grunt.file.recurse('docs/_screenshots/', function(abspath, root, subdir, filename){
            if (!/.html$/.test(filename))
                return;
            subdir = subdir || '';

            var outdir = "docs/_static/screenshots/" + subdir,
                outfile = outdir + filename.replace(/.html$/, '.png');

            if (!grunt.file.exists(outdir))
                grunt.file.mkdir(outdir);

            grunt.util.spawn({
                cmd: phantomjs,
                args: ['docs/_screenshots/script/screenshot.js', abspath, outfile]
            });
        });
    });
};
