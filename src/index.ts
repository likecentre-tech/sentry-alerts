import 'reflect-metadata';
import { YC } from './yc';
import Handler from './handler';

export async function handler(event: YC.CloudFunctionsHttpEvent) {
  await Handler.process(event.body)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    isBase64Encoded: false,
  };
}