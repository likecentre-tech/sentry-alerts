import { YC } from './yc';
// import config from './config';

export async function handler(event: YC.CloudFunctionsHttpEvent) {
  // const qs = Buffer.from((event.body) as 'base64', 'base64').toString();
  // const params = Object.fromEntries(new URLSearchParams(qs));

  console.log(event.body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    isBase64Encoded: false,
  };
}