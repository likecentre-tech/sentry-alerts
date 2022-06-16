import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { YC } from './yc';
// import config from './config';
import SentryWebhook from './models/SentryWebhook';

export async function handler(event: YC.CloudFunctionsHttpEvent) {
  console.log(event.body);

  if (event.body) {
    const sentryWebhook = plainToInstance(SentryWebhook, JSON.parse(event.body))

    console.log(sentryWebhook)
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    isBase64Encoded: false,
  };
}