module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        base_folder: "app/",
        dist_folder_js: 'app/dist/js/',
        dist_folder_css: 'app/dist/css/',
        dist_folder_fonts: 'app/dist/fonts/',
        dist_folder_html: 'app/dist/html/',
        less: {
            megamtech_gen_css: {
                files: {
                    '<%= dist_folder_css %><%=megamtech_css_custom %>': '<%=megamtech_less_custom %>'
                }
            }
        },
        htmlmin: {// Task
            dist: {// Target
                options: {// Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'app/module/',
                src: ['**/*.html'],
                dest: '<%= dist_folder_html %>'

            }
        },
        concat: {
            options: {
                banner: '/*!\n <%= pkg.name %> \n Copyright to : <%= pkg.copyright_to %> \n Developed By :  <%= pkg.developed_by %>(<%= pkg.developer_site %>) \n Created On : <%= grunt.template.today("yyyy-mm-dd") %> \n */\n'
            },
            megamtech: {
                src: ['<%=app_js%>', '<%=megamtech_js_constants %>', '<%=megamtech_js_services %>', '<%=megamtech_js_filters %>', '<%=megamtech_js_directives %>', '<%=megamtech_js_common %>', '<%=megamtech_js_modules %>'],
                dest: '<%= dist_folder_js %><%= pkg.name %>.js'
            },
            megamtechlib: {
                src: ['<%=bower_components_js%>'],
                dest: '<%= dist_folder_js %><%= pkg.name %>.lib.js'
            },
            megamtechcss: {
                src: ['<%=megamtech_css_lib%>', '<%= dist_folder_css %><%=megamtech_css_custom%>'],
                dest: '<%= dist_folder_css %><%= pkg.name %>.css'
            }

        },
        uglify: {
            options: {
                mangle: false,
                drop_console: true,
                banner: '/*!\n <%= pkg.name %> \n Copyright to : <%= pkg.copyright_to %> \n Developed By :  <%= pkg.developed_by %>(<%= pkg.developer_site %>) \n Created On : <%= grunt.template.today("yyyy-mm-dd") %> \n */\n',
                preserveComments: false
            },
            megamtech_compress: {
                files: {
                    '<%= dist_folder_js %><%= pkg.name %>.min.js': ['<%= dist_folder_js %><%= pkg.name %>.js']
                }
            },
            megamtech_lib_compress: {
                files: {
                    '<%= dist_folder_js %><%= pkg.name %>.lib.min.js': ['<%= dist_folder_js %><%= pkg.name %>.lib.js'],
                }
            }

        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/bower_components/components-font-awesome/fonts/', // change this for font-awesome
                        src: ['*.*'],
                        dest: '<%= dist_folder_fonts %>'
                    }, {
                        expand: true,
                        dot: true,
                        cwd: 'app/bower_components/bootstrap/dist/fonts/', // change this for Glypicons
                        src: ['*.*'],
                        dest: '<%= dist_folder_fonts %>'
                    }
                ]
            }},
        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: ['E001', 'W001', 'W002', 'W003', 'W005']
            },
            files: ['<%= megamtech_src_html_folder %>**/*.html']
        },
        cssmin: {
            options: {
                report: 'gzip'
            },
            megamtech_compress: {
                files: {
                    '<%= dist_folder_css %><%= pkg.name %>.min.css': ['<%= dist_folder_css %><%= pkg.name %>.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%=app_js%>', '<%=megamtech_js_constants %>', '<%=megamtech_js_filters %>', '<%=megamtech_js_directives %>', '<%=megamtech_js_services %>', '<%=megamtech_js_modules %>', '<%=megamtech_less_custom %>'],
                tasks: ['less:megamtech_gen_css', 'concat:megamtech', 'uglify:megamtech_compress', 'concat:megamtechcss', 'cssmin:megamtech_compress']
            }
        },
        megamtech_js_modules: [
            'app/module/common/template.js',
            'app/module/users/userController.js',

        ],
        megamtech_js_directives: ['app/directives/*.js'],
        megamtech_js_services: ['app/services/*.js'],
        megamtech_js_common: ['app/common/*.js'],
        megamtech_js_constants: ['app/js/constants.js'],
        megamtech_js_filters: ['app/filters/*.js'],
        megamtech_src_html_folder: ['app/module/'],
        megamtech_css_lib: [
            "app/bower_components/bootstrap/dist/css/bootstrap.min.css",
            "app/bower_components/angular-bootstrap/ui-bootstrap-csp.min.css",
            "app/bower_components/components-font-awesome/css/font-awesome.min.css",
            "app/bower_components/angular-loading-bar/build/loading-bar.min.css",
            "app/bower_components/angular-ui-switch/angular-ui-switch.min.css",
            "app/bower_components/angular-validation-messages/angular-validation-messages.min.css",
            "app/bower_components/ng-tags-input/ng-tags-input.min.css",
            "app/bower_components/textAngular/dist/textAngular.css"
        ],
        megamtech_css_custom: ["app.css"],
        megamtech_less_custom: ["app/css/app.less"],
        app_js: ['app/app.js'],
        bower_components_js: [
            //Using jquery before angular to use eval or execute js inside html
            "app/bower_components/jquery/dist/jquery.min.js",
            "app/bower_components/bootstrap/dist/js/bootstrap.min.js",
            "app/bower_components/angular/angular.min.js",
            "app/bower_components/angular-sanitize/angular-sanitize.min.js",
            "app/bower_components/angular-bootstrap/ui-bootstrap.min.js",
            "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "app/bower_components/angular-animate/angular-animate.min.js",
            "app/bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "app/bower_components/angular-route/angular-route.min.js",
            "app/bower_components/angular-loading-bar/build/loading-bar.min.js",
            "app/bower_components/angular-ui-switch/angular-ui-switch.min.js",
            "app/bower_components/angular-permission/dist/angular-permission.min.js",
            "app/bower_components/satellizer/satellizer.min.js",
            "app/bower_components/ng-table/dist/ng-table.min.js",
            "app/bower_components/ngtoast/dist/ngToast.min.js",
            "app/bower_components/ngstorage/ngStorage.min.js",
            "app/bower_components/ng-file-upload/ng-file-upload-all.min.js",
            "app/bower_components/textAngular/dist/textAngular-rangy.min.js",
            "app/bower_components/textAngular/dist/textAngular.min.js",
            "app/bower_components/textAngular/dist/textAngular-sanitize.min.js",
            "app/bower_components/ng-tags-input/ng-tags-input.min.js",
            "app/bower_components/angular-auto-validate/dist/jcs-auto-validate.min.js",
            "app/bower_components/moment/moment.js",
            "app/bower_components/angular-moment/angular-moment.js",
        ]
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['cssgen', 'concat', 'uglify', 'cssmin', 'copy', 'htmlmin']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('cssgen', ['less:megamtech_gen_css']);
    grunt.registerTask('checkhtml', ['bootlint']);
    grunt.registerTask('jslib', ['concat:megamtechlib', 'uglify:megamtech_lib_compress']);
    grunt.registerTask('jscustom', ['concat:megamtech', 'uglify:megamtech_compress']);
    grunt.registerTask('csslib', ['concat:megamtechcss']);
};


