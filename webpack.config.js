const webpack = require('webpack');
const plugins = require('./config/helpers.plugins');
const helpers = require('./config/helpers.methods');

//
module.exports = function () {

    return {
        cache : false,
        target: "web",

        entry: {
            "background": helpers.root("ts", "background.ts"),
            "options"   : helpers.root("ts", "options.ts")
        },

        output: {
            "path"         : helpers.root('build/'),
            "filename"     : "js/[name].js",
            "chunkFilename": "js/[id].js"
        },

        resolve: {
            extensions: ['.ts'],
            // remove other default values
            modules   : ['node_modules']
        },

        module : {
            loaders: [
                {
                    test   : /\.ts$/,
                    use    : "ts-loader",
                    exclude: [/\.(spec|e2e)\.ts$/]
                }
            ]
        },
        plugins: [
            /**
             * Skip the emitting phase
             */
            new webpack.NoEmitOnErrorsPlugin(),

            /**
             * Defines externals.
             */
            new plugins.ExternalsPlugin({
                type   : 'commonjs',
                include: __dirname + '/node_modules'
            }),
            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             */
            new plugins.CopyWebpackPlugin([
                {
                    from: "manifest.json"
                },
                {
                    from: "img", to: "img"
                },
                {
                    from: "css", to: "css"
                },
                {
                    from: 'html', to: "html"
                }, {
                    from: '_locales', to: "_locales"
                }], {
                // By default, we only copy modified files during
                // a watch or webpack-dev-server build. Setting this
                // to `true` copies all files.
                copyUnmodified: true
            })
        ],
        profile: true,
        stats  : {
            hash        : true,
            version     : true,
            timings     : true,
            assets      : true,
            chunks      : true,
            modules     : true,
            reasons     : true,
            children    : true,
            source      : true,
            errors      : true,
            errorDetails: true,
            warnings    : true,
            publicPath  : true
        }
    }

};