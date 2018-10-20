// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    files: [
      '../node_modules/bootstrap/dist/css/bootstrap.min.css',
      '../node_modules/@fortawesome/fontawesome-free/css/all.css',
      './styles.css',
      './assets/flatly.css'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-opera-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
  browsers: ['Chrome', 'Firefox', 'IE'],
    customLaunchers: {
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      },
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false
  });

  if (process.env.TRAVIS){
    config.browsers = ['Chrome_travis_ci'];
    config.set({singleRun: true})
  }
};
