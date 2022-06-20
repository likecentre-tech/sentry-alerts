import { Expose } from 'class-transformer';

export default class Metadata {
    @Expose()
    filename: string;

    @Expose()
    function: string;

    @Expose()
    type?: string;

    @Expose()
    title?: string;

    @Expose()
    value: string;
}


