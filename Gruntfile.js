var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    responsive_images_extender: { // must update when updating images
      dev: {
        options: {
          separator: '-',
          srcAttribute: 'none',
          sizes: [{
            selector: '.portrait',
            sizeList: [{
              cond: 'max-width: 32em',
              size: '100vw'
            },{
              cond: 'default',
              size: '10em'
            }]
          }]
        },
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['**/*.{html,htm,php}'],
          dest: 'dev/'
        }]
      }
    },
    responsive_images: {
      options: {
        engine: "im"
      },
      portraits: {
        options: {
          sizes: [{
            width: 200
          },{
            width: 400
          },{
            width: 800
          }]
        },
        files: [{
          expand: true,
          cwd: 'src/images/portraits/',
          src: ['*.jpg'],
          dest: 'dev/images/portraits/'
        }]
      },
      banners: {
        options: {
          sizes: [{
            width: 500
          },{
            width: 1000
          },{
            width: 2000
          },{
            width: 3000
          }]
        },
        files: [{
          expand: true,
          cwd: 'src/images/banners/',
          src: ['*.jpg'],
          dest: 'dev/images/banners/'
        }]
      }
    },
    clean: {
      dev: ["dev/"],
      prod: ["*.html", "css/", "images/", "js/"]
    },
    sass: {
      options: {
        sourceMap: true,
      },
      dev: {
        files: {'dev/css/layout.css': 'src/scss/layout.scss'}
      }
    },
    postcss: {
      options: {
        map: true,

        processors: [
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 20 versions'}),
          require('cssnano')()
        ]
      },
      prod: {
        src: 'css/*.css'
      }
    },
    processhtml: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html', '!templates/**/*.html'],
          dest: 'dev/'
        }]
      }
    },
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['*.html'],
          dest: ''
        }]
      },
    },
    uglify: {
      prod: {
        files: [{
          expand: true,
          cwd: 'dev/js',
          src: '**/*.js',
          dest: 'js'
        }]
      }
    },
    imagemin: {
      prod: { //26.0, 64.1, 173.0
        options: {
          use: [mozjpeg()]
        },
        files: [{
          expand: true,
          cwd: 'dev/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    copy: {
      js: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: ['*.js'],
          dest: 'dev/js/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{jpg,png,gif}', '!portraits/*.jpg', '!banners/*.jpg'],
          dest: 'dev/images/'
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: 'dev/css/',
          src: ['*.{css,css.map}'],
          dest: 'css/'
        }]
      }
    },
    watch: {
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['newer:sass:dev']
      },
      html: {
        files: ['src/*.html', 'src/templates/*.html'],
        tasks: ['newer:processhtml:dev', 
          'newer:responsive_images_extender:dev']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['newer:copy:js']
      },
      images: {
        files: ['src/images/**/*.{jpg,png,gif}'],
        tasks: ['newer:copy:images', 
          'newer:responsive_images:portraits', 
          'newer:responsive_images:banners',
          'processhtml:dev',
          'responsive_images_extender:dev']
      }
    },
    focus: { // Run multiple watch tasks
      dev: {
        include: ['css','html','js','images']
      }
    }
  });
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-responsive-images-extender');
	
	grunt.loadNpmTasks('grunt-focus');
	
	grunt.loadNpmTasks('grunt-newer');
	
	grunt.registerTask('dev', [
	  'newer:copy:js', 
	  'newer:copy:images',
	  'newer:sass:dev',
	  'newer:responsive_images:portraits',
	  'newer:responsive_images:banners',
	  'newer:processhtml:dev', 
	  'newer:responsive_images_extender:dev']);
	  
  //dist, maybe
  grunt.registerTask('prod', ['clean:prod',
    'dev',
	  'htmlmin:prod', 
	  'uglify:prod', 
	  'imagemin:prod',
	  'copy:css',
	  'postcss:prod']);
	  
	grunt.registerTask('default', ['dev', 'focus:dev']);
}

