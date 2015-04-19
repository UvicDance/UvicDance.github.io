module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['**/*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },
    
    clean: {
      build: {
        src: [ 'dest' ]
      },
    },
    cssmin: {
      options: {
        processImport: false
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dest/css',
          ext: '.css'
        }]
      }
    },
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/scripts',
          src: ['*.js', '!*.min.js'],
          dest: 'dest/scripts',
          ext: '.js'
        }]
      }
    },

    processhtml: {
      options: {
        process: true
      },
      serve: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.html'],
            dest: '.',
            ext: '.html'
          }
        ]
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true, 
            cwd: 'src/css/',
            src: '**/*.min.css', 
            dest: 'dest/css/'
          },
          {
            expand: true, 
            cwd: 'src/css/',
            src: ['**/*', '!**/*.css', '!**/*.css.map'],
            dest: 'dest/css/'
          },
          {
            expand: true, 
            cwd: 'src/js/',
            src: '**/*.min.js', 
            dest: 'dest/js/'
          },
          {
            expand: true, 
            cwd: 'src/js/',
            src: ['**/*', '!**/*.js'],
            dest: 'dest/js/'
          },
          {
            expand: true, 
            cwd: 'src/',
            src: ['**/*.html', '!templates/**/*.html'],
            dest: 'dest/'
          },
          {
            expand: true, 
            cwd: 'src/',
            src: 'images/**/*', 
            dest: 'dest/'
          },
          {
            expand: true, 
            cwd: 'src/',
            src: ['CNAME'],
            dest: 'dest/'
          }
        ],
      },
    },
    watch: {
      css: {
        files: ['src/**/*.scss'],
        tasks: ['sass']
      },
      reload: {
        files: ['GruntFile.js', 'src/**/*', '!src/**/*.scss', '!src/**/*~'],
        options: {
          livereload: true
        }
      }
    },
    
    focus: {
      serve: {
        include: ['css', 'reload']
      }
    },
    
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "localhost",
          base: 'src',
          livereload: true,
          open: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-focus');

  grunt.registerTask('serve', ['connect', 'focus:serve']);

  grunt.registerTask('default', ['clean', 'sass', 'uglify', 'cssmin', 'copy']);
};


