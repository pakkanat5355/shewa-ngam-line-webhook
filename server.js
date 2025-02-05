require("dotenv").config();
const { Client } = require("@line/bot-sdk");

// LINE Bot Config
const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const promises = body.events.map(async (event) => {
        if (event.type === "message" && event.message.type === "text") {
            return client.replyMessage(event.replyToken, {
                type: "text",
                text: `You said: ${event.message.text}`,
            });
        }
    });

    await Promise.all(promises);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "OK" }),
    };
};
