module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-get-location': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-get-location/android',
          packageImportPath: 'import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;',
          packageInstance: 'new ReactNativeGetLocationPackage()',
        },
      },
    },
  },
  assets: ['./src/assets/fonts/'],
};
