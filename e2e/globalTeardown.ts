import testPageServer from './testPageServer';

export default async function globalTeardown() {
  await new Promise<void>((resolve) => testPageServer.close(() => resolve()));
}
