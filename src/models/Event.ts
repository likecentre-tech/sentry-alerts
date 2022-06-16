import { Expose } from 'class-transformer';

export default class Event {
    @Expose()
    event_id: string;

    @Expose()
    platform: string;

    @Expose()
    environment: string;

    @Expose()
    timestamp: string;
}
