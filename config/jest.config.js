module.exports = {
    setupFilesAfterEnv: ['<rootDir>/config/setup-test-env.js'],
};
module.exports = {
    rootDir: '../',
    testURL: 'http://localhost',
    testMatch: [
        '**/tests/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    transform: {
        '^.+\\.jsx?$': '<rootDir>/config/jest-preprocess.js',
    },
    setupFilesAfterEnv: ['<rootDir>/config/setup-test-env.js'],
    testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
    globals: {
        __PATH_PREFIX__: '',
    },
};
