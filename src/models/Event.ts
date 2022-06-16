import { IsString, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export default class Event {
    @Expose()
    @IsString()
    event_id: string;

    @Expose()
    @IsString()
    platform: string;

    @Expose()
    @IsString()
    environment: string;

    @Expose()
    @IsNumber()
    timestamp: string;
}
