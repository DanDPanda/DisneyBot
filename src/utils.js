const parseMessage = (message) => {
    if (message[0] !== "!") {
        return {
            command: null,
            args: null
        };
    }
    const messageArray = message.split(" ");
    return {
        command: messageArray[0].slice(1, messageArray[0].length),
        args: messageArray.slice(1, messageArray.length)
    }
}

module.exports = {
    parseMessage
}