var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var StatsPlugin = require('stats-webpack-plugin');

var webpack = require('webpack');

//-=======================================================---
//------------------ Build
//-=======================================================---

gulp.task('sass-to-css', () => {

	return gulp.src('client/index.sass')
		.pipe(plugins.sass())
		.pipe(plugins.rename({ basename: `styles` }))
		.pipe(gulp.dest('public'));

});

gulp.task('jade-to-html', () => {

	return gulp.src('client/index.jade')
		.pipe(plugins.jade({ pretty: true }))
		.pipe(gulp.dest('public'));

});

gulp.task('bundle-js', done => {

	var webpackOptions = {

		context: path.join(__dirname, './client'),
		entry: './index.js',

		output: { path: './public', filename: 'bundle.js' },

		plugins: [
			new StatsPlugin('../webpack-stats.json', {})
		],

		module: {
			loaders: [

				// es2015 => inject(es5)
				{ test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } }

			]
		}
	};

	webpack(webpackOptions, err => {
		if (err) throw new plugins.util.PluginError("webpack", err);

		done();
	});

});

//-=======================================================---
//------------------ Batches
//-=======================================================---

gulp.task('build', ['sass-to-css', 'jade-to-html', 'bundle-js']);