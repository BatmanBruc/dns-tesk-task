import dataProductsMock from './data/dataProductsMock.json';

export default defineEventHandler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return dataProductsMock;
});
