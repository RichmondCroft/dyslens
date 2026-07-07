import testPageServer, { TEST_PAGE_SERVER_PORT } from './testPageServer';

export default async function globalSetup() {
  await new Promise<void>((resolve) => testPageServer.listen(TEST_PAGE_SERVER_PORT, resolve));
}
