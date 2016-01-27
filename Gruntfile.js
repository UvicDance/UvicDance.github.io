module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'css/layout.css' : 'scss/layout.scss'
        }
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
      dist: {
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
            width: 100
          },{
            width: 200
          },{
            width: 400
          },{
            width: 800
          }]
        },
        files: [{
          expand: true,
          src: ['images/portraits/**.jpg'],
          dest: 'images/portraits2/'
        }]
      }
    },
    watch: {
      css: {
        files: ['**/*.scss'],
        tasks: ['sass', 'postcss']
      },
      html: {
        files: ['*.html', '**/*.html'],
        tasks: []
      },
      images: {
        files: ['images/*.{jpg,png}'],
        tasks: ['responsive_images:portraits']
      }
    },
    concurrent: {
      dev: {
        tasks: ["watch:css", "watch:html", "watch:images"],
      }
    }
  });
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-image-resize');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-responsive-images');
	
	grunt.registerTask('default',['sass','postcss','concurrent:dev']);
	grunt.registerTask('t',['responsive_images:portraits']);
}
