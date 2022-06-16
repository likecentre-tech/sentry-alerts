import { IsString, IsUrl } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import Event from './Event';

export default class SentryWebhook {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    project: string;

    @Expose()
    @IsString()
    level: string;

    @Expose()
    @IsString()
    message: string;

    @Expose()
    @IsUrl()
    url: string;

    @Expose()
    @Type(() => Event)
    event: Event;
}
