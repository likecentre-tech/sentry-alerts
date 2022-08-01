import 'reflect-metadata';
import { YC } from './yc';
import Handler from './handler';
// Debug statement
// import sampleEvent from './sample_event.json';

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

// Debug statement
// handler({ body: JSON.stringify(sampleEvent) } as YC.CloudFunctionsHttpEvent)