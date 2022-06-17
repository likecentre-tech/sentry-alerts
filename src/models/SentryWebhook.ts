import { Type, Expose } from 'class-transformer';
import Event from './Event';
import Metadata from './Metadata';

export default class SentryWebhook {
    @Expose()
    id: string;

    @Expose()
    project: string;

    @Expose()
    level: string;

    @Expose()
    message: string;

    @Expose()
    url: string;

    @Expose()
    @Type(() => Event)
    event: Event;

    @Expose()
    @Type(() => Metadata)
    metadata: Metadata;
}
