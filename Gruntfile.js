/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    bootstrapPath: 'bower_components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap',

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {

      /* scss_boostrap concat subtask: Concat all Bootstrap Sass files into a single file.
       *
       * Although NationBuilder has a Sass compiler built in, it does not support folders in its theme distributions.
       * Bootstrap @imports are designed to reference the bootstrap folder structure.  Therefore, to make bootstrap
       * work in the NationBuilder Sass compiler, we're just going to concatenate all the bootstrap files into one
       * monolithic Sass file, dist/bootstrap_concat.scss (in other words, we are doing a sort of manual @import).
       *
       * Building a monolithic Sass file instead of actually compiling bootstrap into a css file allows us to include
       * our own variables.scss override into the NationBuilder Sass compiler, customizing the bootstrap build for
       * our own assets.
       */
      scss_bootstrap: {
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        nonull: true,

        // Here we reproduce bootstrap.scss, but instead of @imports we specify the files to concat manually
        // (If bootstrap ever changes file structure, this will have to be updated!  Should match Bootstrap 3.1)
        src: [
              // Core variables and mixins
              '<%= bootstrapPath %>/_variables.scss',
              '<%= bootstrapPath %>/mixins/*.scss', // no mixins/ files contain @imports, so just concat them all

              // Reset and dependencies
              '<%= bootstrapPath %>/_normalize.scss',
              '<%= bootstrapPath %>/_print.scss',
              '<%= bootstrapPath %>/_glyphicons.scss',

              // Core CSS
              '<%= bootstrapPath %>/_scaffolding.scss',
              '<%= bootstrapPath %>/_type.scss',
              '<%= bootstrapPath %>/_code.scss',
              '<%= bootstrapPath %>/_grid.scss',
              '<%= bootstrapPath %>/_tables.scss',
              '<%= bootstrapPath %>/_forms.scss',
              '<%= bootstrapPath %>/_buttons.scss',

              // Components
              '<%= bootstrapPath %>/_component-animations.scss',
              '<%= bootstrapPath %>/_dropdowns.scss',
              '<%= bootstrapPath %>/_button-groups.scss',
              '<%= bootstrapPath %>/_input-groups.scss',
              '<%= bootstrapPath %>/_navs.scss',
              '<%= bootstrapPath %>/_navbar.scss',
              '<%= bootstrapPath %>/_breadcrumbs.scss',
              '<%= bootstrapPath %>/_pagination.scss',
              '<%= bootstrapPath %>/_pager.scss',
              '<%= bootstrapPath %>/_labels.scss',
              '<%= bootstrapPath %>/_badges.scss',
              '<%= bootstrapPath %>/_jumbotron.scss',
              '<%= bootstrapPath %>/_thumbnails.scss',
              '<%= bootstrapPath %>/_alerts.scss',
              '<%= bootstrapPath %>/_progress-bars.scss',
              '<%= bootstrapPath %>/_media.scss',
              '<%= bootstrapPath %>/_list-group.scss',
              '<%= bootstrapPath %>/_panels.scss',
              '<%= bootstrapPath %>/_responsive-embed.scss',
              '<%= bootstrapPath %>/_wells.scss',
              '<%= bootstrapPath %>/_close.scss',

              // Components w/ JavaScript
              '<%= bootstrapPath %>/_modals.scss',
              '<%= bootstrapPath %>/_tooltip.scss',
              '<%= bootstrapPath %>/_popovers.scss',
              '<%= bootstrapPath %>/_carousel.scss',

              // Utility classes
              '<%= bootstrapPath %>/_utilities.scss',
              '<%= bootstrapPath %>/_responsive-utilities.scss'
             ],
        dest: 'dist/bootstrap_concat.scss'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-nodeunit');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  //grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['concat']);

};
