module.exports = {
    "preset": 'ts-jest/presets/js-with-ts',
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", "tsconfig.json"],
    },
    testMatch: ["**/tests/**/*.spec.(ts|js)"],
    testEnvironment: "node",
};
