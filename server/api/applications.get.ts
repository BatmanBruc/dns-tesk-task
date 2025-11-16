import dataApplicationsMock from './data/dataApplicationsMock.json';

export default defineEventHandler(async () => {
  return dataApplicationsMock;
});
