// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


module.exports = function (wallaby) {
    return {
        files: [
            'Specifications/tsconfig.json',
            'tsconfig.json',
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            'Source/**/*.ts'
        ],

        tests: [
            'Specifications/**/*.ts'
        ],

        env: {
            type: 'node'
        },

        setup: (wallaby) => {
            if (global._tsconfigPathsRegistered) return;
            const tsConfigPaths = require('tsconfig-paths');
            const tsconfig = require('./Specifications/tsconfig.json');
            tsConfigPaths.register({
              baseUrl: './',
              paths: tsconfig.compilerOptions.paths
            });
            global._tsconfigPathsRegistered = true;

            global.expect = chai.expect;
            const should = chai.should();
            global.sinon = require('sinon');
            const sinonChai = require('sinon-chai');
            const chaiAsPromised = require('chai-as-promised');
            chai.use(sinonChai);
            chai.use(chaiAsPromised);
        }
    };
};
