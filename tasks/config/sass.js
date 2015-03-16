/**
 * Compiles COMPASS files into project.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.scss` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-compass
 */
module.exports = function(grunt) {

	grunt.config.set('sass', {
		dev: {
			options: {
				compass: true,
				debugInfo: true,
				loadPath: [
          'bower_components/foundation/scss',
          'assets/styles/partials'
        ]
			},
			files: [{
				expand: true,
				cwd: 'assets/styles/',
				src: ['importer.scss'],
				dest: '.tmp/public/styles/',
				ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

};
