require("dotenv").config();
const express = require("express");
const { Client } = require("@line/bot-sdk");

const app = express();
const port = process.env.PORT || 8080;

const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

app.use(express.json());

app.post("/webhook", async (req, res) => {
    const events = req.body.events;
    for (let event of events) {
        if (event.type === "message" && event.message.type === "text") {
            await client.replyMessage(event.replyToken, {
                type: "text",
                text: `You said: ${event.message.text}`,
            });
        }
    }
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
