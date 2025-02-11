module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'test-coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.css': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx)$': './node_modules/babel-jest',
    },
}