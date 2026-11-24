import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries, MicroCMSDate } from 'microcms-js-sdk';

export type Memo = {
  id: string;
  title: string;
  content: string;
  category?: string[];
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getMemos = async (queries?: MicroCMSQueries) => {
  return await client.getList<Memo>({
    endpoint: 'memos',
    queries,
  });
};

export const getMemoDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Memo>({
    endpoint: 'memos',
    contentId,
    queries,
  });
};
