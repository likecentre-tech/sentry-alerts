import axios from 'axios'
import config from './config';
import { plainToInstance } from 'class-transformer';
import SentryWebhook from './models/SentryWebhook';

interface MessageItem {
    label: string | null;
    value: string;
}

class Handler {
    static async process(body: string) {
        try {
            console.log(body)

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
            const response = await axios.get(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
                params: {
                    parse_mode: 'MarkdownV2',
                    disable_web_page_preview: true,
                    chat_id: chat_id || config.chatId,
                    text,
                }
            })

            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.error((error as any).data);
        }
    }

    static getMessageText(webhook: SentryWebhook): string {
        const messageItems: MessageItem[] = this.getMessageItems(webhook);

        const formattedItems = this.formatMessageItems(messageItems)

        return formattedItems.filter(Boolean).join('\n');
    }

    static getMessageItems(webhook: SentryWebhook): MessageItem[] {
        return [
            {
                label: 'Project',
                value: this.escaped(webhook.project)
            },
            {
                label: 'Environment',
                value: this.capitalizeFirstLetter(webhook.event.environment)
            },
            {
                label: 'Level',
                value: this.capitalizeFirstLetter(webhook.level)
            },
            {
                label: null,
                value: this.escaped(webhook?.metadata?.type || webhook?.metadata?.title || '')
            },
            {
                label: null,
                value: this.escaped(webhook.message) || this.escaped(webhook?.metadata?.value) || ''
            },
            {
                label: null,
                value: `[Issue](${webhook.url})`
            }
        ]
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

    static formatMessageItems(data: MessageItem[]) {
        return data.map(item => {
            if (item.label) {
                return `${item.label}: *${item.value}*`
            }

            return item.value;
        })
    }
}

export default Handler;