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
              cond: 'max-width: 30em',
              size: '100vw'
            },{
              cond: 'max-width: 50em',
              size: '50vw'
            },{
              cond: 'default',
              size: '30vw'
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
          src: ['*.jpg'],
          cwd: 'src/images/portraits/',
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
          src: ['*.jpg'],
          cwd: 'src/images/banners/',
          dest: 'dev/images/banners/'
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
          dest: 'dev/js/',
          filter: 'isFile'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{jpg,png,gif}', '!portraits/*.jpg', '!banners/*.jpg'],
          dest: 'dev/images/',
          filter: 'isFile'
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.html'],
          dest: 'dev/',
          filter: 'isFile'
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: 'dev/css/',
          src: ['*.{css,css.map}'],
          dest: 'css/',
          filter: 'isFile'
        }]
      }
    },
    watch: {
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass', 'postcss']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html', 'responsive_images_extender:dev']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['copy:js']
      },
      images_portraits: {
        files: ['src/images/portraits/*.{jpg,png}'],
        tasks: ['responsive_images:portraits']
      },
      images_banners: {
        files: ['src/images/banners/*.{jpg,png}'],
        tasks: ['responsive_images:banners']
      },
      images: {
        files: ['src/images/**', 
          '!src/images/portraits/*.{jpg,png}', 
          '!src/images/banner/s*.{jpg,png}'],
        tasks: ['copy:images']
      }
    },
    concurrent: {
      dev: {
        tasks: ["watch:css", 
          "watch:html", 
          "watch:js",
          "watch:images_portraits", 
          "watch:images_banners",
          "watch:images"],
      }
    }
  });
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-responsive-images-extender');
	
	grunt.registerTask('dev', ['clean:dev',
	  'copy:html', 
	  'copy:js', 
	  'copy:images',
	  'sass:dev',
	  'responsive_images:portraits',
	  'responsive_images:banners',
	  'responsive_images_extender:dev']);
	  
  //dist, maybe
  grunt.registerTask('prod', ['clean:prod',
    'dev',
	  'htmlmin:prod', 
	  'uglify:prod', 
	  'imagemin:prod',
	  'copy:css',
	  'postcss:prod']);
	  
	grunt.registerTask('default', ['dev', 'concurrent:dev']);
}

