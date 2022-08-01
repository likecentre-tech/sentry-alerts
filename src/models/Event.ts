import { Type, Expose } from 'class-transformer';
import Metadata from './Metadata';

export default class Event {
    @Expose()
    event_id: string;

    @Expose()
    culprit?: string;

    @Expose()
    title?: string;

    @Expose()
    platform: string;

    @Expose()
    environment: string;

    @Expose()
    timestamp: string;

    @Expose()
    @Type(() => Metadata)
    metadata: Metadata;
}
