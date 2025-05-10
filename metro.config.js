// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Para que Metro resuelva correctamente los módulos @firebase/*
  if (moduleName.startsWith("@firebase/")) {
    return context.resolveRequest(
      {
        ...context,
        isESMImport: true,
      },
      moduleName,
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
