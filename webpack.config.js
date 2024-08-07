const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
    return {
        // Basic configuration
        entry: './src/index.ts',
        // Necessary in order to use source maps and debug directly TypeScript files
        devtool: argv.mode === 'production' ? 'nosources-source-map' : 'inline-source-map',
        mode: argv.mode,
        module: {
            rules: [
                // Necessary in order to use TypeScript
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'swc-loader',
                        options: {
                            minify: argv.mode === 'production',
                            sourceMaps: argv.mode !== 'production',
                        }
                    },
                    exclude: /(node_modules|bower_components)/,
                },
            ],
        },
        resolve: {
            // Alway keep '.js' even though you don't use it.
            // https://github.com/webpack/webpack-dev-server/issues/720#issuecomment-268470989
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            // This line is VERY important for VS Code debugging to attach properly
            // Tamper with it at your own risks
            devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        },
        plugins: [
            // No need to write a index.html
            new HtmlWebpackPlugin(),
            // Copy assets to serve them
            new CopyPlugin({ patterns:[{ from: 'data', to: 'data' }, {from: 'assets', to: 'assets'}] }),
        ],
        devServer: {
            static: {
              directory: path.join(__dirname, 'data'),
            },
            compress: true,
            // keep port in sync with VS Code launch.json
            port: 3000,
            // Hot-reloading, the sole reason to use webpack here <3
            hot: true,
        },
    };
};
