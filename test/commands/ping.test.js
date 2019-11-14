const ping = require("../../src/commands/ping");
const sampleMessage = require("../factory/message")

describe('ping', () => {
    test('respond with pong', () => {
        expect(ping(sampleMessage)).toEqual('pong');
    })
})
