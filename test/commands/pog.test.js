const pog = require("../../src/commands/pog");

describe('pog', () => {
    test('respond with pig', () => {
        expect(pog("test message")).toEqual('pig');
    })
})
