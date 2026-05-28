const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../..');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@shared': path.join(monorepoRoot, 'packages/shared/src'),
            '@ds': path.join(monorepoRoot, 'packages/design-system/src'),
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
    ],
  };
};
