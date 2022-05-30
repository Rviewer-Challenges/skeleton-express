module.exports = {
    "preset": 'ts-jest/presets/js-with-ts',
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["**/tests/**/*.spec.(ts|js)"],
    testEnvironment: "node",
};