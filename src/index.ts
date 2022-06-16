import 'reflect-metadata';
// import { transformAndValidate, ClassType } from 'class-transformer-validator';
import { plainToInstance } from 'class-transformer';
import { YC } from './yc';
// import config from './config';
import SentryWebhook from './models/SentryWebhook';

export async function handler(event: YC.CloudFunctionsHttpEvent) {
  console.log(event.body);

  if (event.body) {
    try {
      const sentryWebhook = plainToInstance(SentryWebhook, event.body, { excludeExtraneousValues: true });
      // const sentryWebhook = await transformAndValidate(SentryWebhook, event.body, { transformer: { excludeExtraneousValues: true } });
      console.log(JSON.stringify(sentryWebhook))
    } catch (err) {
      // your error handling
      console.error(err);
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    isBase64Encoded: false,
  };
}