import { createCampaignServer } from "@/lib/api/server";
// import { getClientData } from "@/lib/redis";
import { NextApiRequestWithUser, withAuth } from "@/lib/withAuth";
import { NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequestWithUser, res: NextApiResponse) {
  const message = {
    text: "New Campaing has been created!.",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "New Campaing has been created!.",
        },
      },
      {
        type: "section",
        block_id: "section547",
        text: {
          type: "mrkdwn",
          text:
            `*Campaign Details*\n\n` +
            `*• Campaign Name*: ${req.body.name}\n` +
            `*• Campaign Type*: ${
              req.body.scrap && req.body.organicTweet
                ? "Scrap and Organic"
                : req.body.scrap
                ? "Scrap"
                : "Organic"
            }\n` +
            `*• Start Date*: ${req.body.month} ${req.body.day} ${req.body.year}\n` +
            `*• Campaign Duration*: ${req.body.duration}`,
        },
      },
    ],
  };

  if (req.body.scrap) {
    message.blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: req.body.scrap
          ? `*Words:*\n` +
            `*• Exact Match:* ${req.body.words.exactMatch}\n` +
            `*• Words:* ${req.body.words.words}\n` +
            `*• Comments per mentions:* ${req.body.words.comments}`
          : "",
      },
    });
  }

  if (req.body.organicTweet) {
    message.blocks.push({
      type: "section",
      block_id: "section567",
      text: {
        type: "mrkdwn",
        text: req.body.organicTweet
          ? `*About Themes:*\n` +
            `• ${req.body.about.about1}\n` +
            `• ${req.body.about.about2}\n` +
            `${req.body.about.about3 ? `• ${req.body.about.about3}\n` : ""}` +
            `\n*Tweets per hour:* ${req.body.tweetsPerHour}`
          : "",
      },
    });
  }
  const clients = await createCampaignServer(message);

  return res.json(clients);
}

export default use(withAuth, hello);
