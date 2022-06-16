import { IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import Event from './Event';

export default class SentryWebhook {
    @IsString()
    id: string;

    @IsString()
    project: string;

    @IsString()
    level: string;

    @IsString()
    message: string;

    @IsUrl()
    url: string;

    @Type(() => Event)
    event: Event;
}
