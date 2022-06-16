import { IsInt, IsString } from 'class-validator';

export default class SentryWebhook {
    @IsInt()
    id: number | undefined;

    @IsString()
    project: string | undefined;
}
