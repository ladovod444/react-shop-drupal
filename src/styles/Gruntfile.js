module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // concat: {
        //     dist: {
        //         src: ['front/scss/*.scss'],
        //         dest: 'front/master.scss',
        //     }
        // },

        sass: {
            build: {
                options: {
                    style: 'expanded'
                },
                // options: {
                //     style: 'compressed',
                //     sourceMap: false
                // },
                files: {
                     'dist/styles.css': 'src/master.scss'
                    //'front/styles.css': ['front/scss/*.scss']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('default', ['concat', 'sass']);
    grunt.registerTask('default', ['sass']);

    //grunt.registerTask('default', ['sass:dist']);
};