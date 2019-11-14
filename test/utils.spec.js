const utils = require("../src/utils");

describe('utils', () => {
    describe("parseMessage", () => {
        let sampleMessage;

        beforeEach(() => {
            sampleMessage = require("./factory/message");
        })

        test('should return if not exclamation mark', () => {
            const expectedRespones = {
                command: null,
                args: null
            }
            expect(utils.parseMessage(`${sampleMessage.content}`)).toEqual(expectedRespones)
        })

        test('should return an object with the commands and args', () => {
            const expectedSentenceArray = `!${sampleMessage.content}`.split(" ");
            const expectedResponse = {
                command: expectedSentenceArray[0].slice(1, expectedSentenceArray[0].length),
                args: expectedSentenceArray.slice(1, expectedSentenceArray.length)
            }

            expect(utils.parseMessage(`!${sampleMessage.content}`)).toEqual(expectedResponse)
        })
    })
})