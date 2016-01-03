'use strict';

var fs = require('fs');
var path = require('path');

var common = require('./common');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var StatsPlugin = require('stats-webpack-plugin');

var webpack = require('webpack');
var moment = require('moment');

var sitemap = require('./server/sitemap-generator');

//-=======================================================---
//------------------ Build
//-=======================================================---

gulp.task('prep-public-dir', () => {

	let copyPaste = [
		'client/manifest.json',
		'client/robots.txt'
	];

	gulp.src(copyPaste, { base: './client' })
		.pipe(gulp.dest('public'));

});

gulp.task('sass-to-css', () => {

	return gulp.src('client/index.sass')
		.pipe(plugins.sass({ outputStyle: process.env.NODE_ENV !== 'production' ? 'expanded' : 'compressed' }))
		.pipe(plugins.rename({ basename: 'styles' }))
		.pipe(gulp.dest('public'));

});

gulp.task('jade-to-html', () => {

	let locals = {
		production: process.env.NODE_ENV === 'production',

		fullTitle: common.fullTitle
	};

	return gulp.src('client/index.jade')
		.pipe(plugins.jade({ pretty: process.env.NODE_ENV !== 'production', locals }))
		.pipe(gulp.dest('public'));

});

gulp.task('bundle-js', done => {

	let webpackOptions = {

		context: path.join(__dirname, './client'),
		entry: './index.js',

		output: { path: './public', filename: 'bundle.js' },

		plugins: [

			new webpack.DefinePlugin({
				'process.env.LOCAL': !!process.env.LOCAL
			}),

			process.env.NODE_ENV !== 'production' ? ()=>{} : new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false }
			}),

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

gulp.task('sitemap', done => {

	fs.stat('./public/index.html', (err, stats) => {
		var homepageLastmod;

		if (err){
			console.error(err);

			homepageLastmod = moment().format('YYYY-MM-DD');

		} else {
			homepageLastmod = moment(stats.mtime).format('YYYY-MM-DD')
		}

		sitemap('public/sitemap.xml', [{
			url: '/',
			changefreq: 'monthly',
			priority: 1,
			lastmod: homepageLastmod
		}], done);

	});
});

//-=======================================================---
//------------------ Batches
//-=======================================================---

gulp.task('build', ['prep-public-dir', 'sass-to-css', 'jade-to-html', 'bundle-js', 'sitemap']);

gulp.task('local-build', ['sass-to-css', 'jade-to-html', 'bundle-js']);