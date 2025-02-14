module.exports = (api) => {
  const isTest = api.env("test");

  return {
    presets: [
      isTest && "@babel/preset-env", // Use Babel only for Jest tests
      isTest && "@babel/preset-react", // Transform JSX only for Jest tests
    ].filter(Boolean), // Removes false values
  };
};
