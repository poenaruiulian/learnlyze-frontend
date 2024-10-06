module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@defaults': './src/components/defaults',
            '@constants': './src/constants',
            '@wrappers': './src/wrappers',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@config': './src/config',
          },
        },
      ],
    ],
  };
};
