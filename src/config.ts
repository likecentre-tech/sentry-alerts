export interface Config {
  botToken: string;
  chatId: string;
}

const botToken = process.env.BOT_API_KEY || '';
const chatId = process.env.CHAT_ID || '';

const config: Config = {
  botToken,
  chatId,
};

export default config;
