module.exports = function(api) {
  api.cache(true)

  const presets = [
    ['babel-preset-expo'],
  ];

  const plugins = [
    'react-native-paper/babel',
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env"
      }
    ]
  ];

  return {
    presets,
    plugins,
  };
};
