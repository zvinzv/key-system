import { headers } from "next/headers";
import { ReportType } from "../types/report.type";

export const report = async ({
  chatId,
  title,
  description,
  payload,
}: ReportType) => {
  const data = {
    chat_id: chatId,
    text: `${title}\n${description}\n${JSON.stringify(payload)}`,
  };
  try {
    const information = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!information.ok) {
      throw new Error("");
    }
  } catch (error) {
    throw new Error("Faild to send report");
  }
};
