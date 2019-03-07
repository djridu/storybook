const path = require('path');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        sourceMap: true,
        localIdentName: '[local]__[hash:base64:5]',
        importLoaders: 1,
    },
};

module.exports = {
    module: {
        rules: [
            {
                test: /\.story\.jsx?$/,
                loaders: [
                    {
                        loader: require.resolve('@storybook/addon-storysource/loader'),
                    }
                ],
                enforce: 'pre',
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', CSSModuleLoader, 'sass-loader'],
                include: path.resolve(__dirname, '../'),
            },
        ],
    },
};
