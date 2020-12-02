// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


module.exports = function (wallaby) {
    return {
        files: [
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            'Source/**/*.ts',
            '!Source/**/when_*'
        ],

        tests: [
            'Source/**/for_*/**/*.ts',
            '!Source/**/given/**/*.ts',
            '!**/*.d.ts'
        ],

        env: {
            type: 'node'
        },

        setup: (wallaby) => {
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
