import axios from 'axios'
import config from './config';
import { plainToInstance } from 'class-transformer';
import SentryWebhook from './models/SentryWebhook';

class Handler {
    static async process(body: string) {
        try {
            console.log(JSON.stringify({ body }))

            const sentryWebhook = this.getSentryWebhook(body)
            await this.sendMessage(this.getMessageText(sentryWebhook));
        } catch (err) {
            // your error handling
            console.error(err);
        }
    }

    static getSentryWebhook(body: string): SentryWebhook {
        return plainToInstance(SentryWebhook, JSON.parse(body), { excludeExtraneousValues: true });
    }

    static async sendMessage(text: string, chat_id = null) {
        try {
            console.log({
                chat_id: chat_id || config.chatId,
                text
            });

            const response = await axios.get(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
                params: {
                    parse_mode: 'MarkdownV2',
                    disable_web_page_preview: true,
                    chat_id: chat_id || config.chatId,
                    text,
                }
            })

            console.log(response.data);
        } catch (error) {
            console.error((error as any).data);
        }
    }

    static getMessageText(webhook: SentryWebhook): string {
        return (`Project: *${this.escaped(webhook.project)}*\nEnvironment: *${this.capitalizeFirstLetter(webhook.event.environment)}*\nLevel: *${this.capitalizeFirstLetter(webhook.level)}*\n${this.escaped(webhook.message)}\n[Issue](${webhook.url})`);
    }

    static capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static escaped(str: string) {
        return str
            .replace(/\_/g, '\\_')
            .replace(/\*/g, '\\*')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/\~/g, '\\~')
            .replace(/\`/g, '\\`')
            .replace(/\>/g, '\\>')
            .replace(/\#/g, '\\#')
            .replace(/\+/g, '\\+')
            .replace(/\-/g, '\\-')
            .replace(/\=/g, '\\=')
            .replace(/\|/g, '\\|')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/\./g, '\\.')
            .replace(/\!/g, '\\!');
    }
}

export default Handler;