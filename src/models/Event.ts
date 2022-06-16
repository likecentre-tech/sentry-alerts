import { IsString, IsNumber } from 'class-validator';

export default class Event {
    @IsString()
    event_id: string;

    @IsString()
    platform: string;

    @IsString()
    environment: string;

    @IsNumber()
    timestamp: string;
}
