import axios from 'axios'
import config from './config';
import { plainToInstance } from 'class-transformer';
import SentryWebhook from './models/SentryWebhook';

class Handler {
    static async process(body: string) {
        try {
            const sentryWebhook = this.getSentryWebhook(body)
            await this.sendMessage(this.getMessageText(sentryWebhook));
        } catch (err) {
            // your error handling
            console.error(err);
        }
    }

    static getSentryWebhook(body: string): SentryWebhook {
        return plainToInstance(SentryWebhook, body, { excludeExtraneousValues: true });
    }

    static async sendMessage(text: string, chat_id = null) {
        try {
            console.log({
                chat_id: chat_id || config.chatId,
                text
            });

            const response = await axios.get(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
                params: {
                    chat_id: chat_id || config.chatId,
                    text,
                }
            })

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    static getMessageText(webhook: SentryWebhook): string {
        return `[${webhook.project}, ${webhook.level}, ${webhook.event.environment}]: ${webhook.message}. [Issue](${webhook.url})`;
    }
}

export default Handler;