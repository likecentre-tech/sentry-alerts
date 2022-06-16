import { IsInt, IsString } from 'class-validator';

export default class SentryWebhook {
    @IsInt()
    id: number;

    @IsString()
    project: string;

    constructor(rawData: any) {
        this.id = rawData?.id;
        this.project = rawData.project;
    }
}
