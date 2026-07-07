// jest-webextension-mock's chrome.storage.<area>.set() only writes to its
// in-memory store — it never notifies chrome.storage.onChanged listeners
// (see node_modules/jest-webextension-mock/src/storage.js). That reactive
// notification is this extension's only communication channel between the
// popup and content scripts, so this shim restores real browser-like
// behavior on top of the mock: wrapping `set()` to diff old/new values and
// invoke every listener registered via chrome.storage.onChanged.addListener.
type Changes = Record<string, { oldValue?: unknown; newValue?: unknown }>;

function wireArea(area: 'sync' | 'local' | 'session' | 'managed') {
  const store = (chrome.storage as any)[area];
  const originalSet = store.set.getMockImplementation();

  store.set.mockImplementation(async (payload: Record<string, unknown>, cb?: () => void) => {
    const oldValues = await store.get(Object.keys(payload));
    await originalSet(payload);

    const changes: Changes = {};
    Object.keys(payload).forEach((key) => {
      changes[key] = { oldValue: oldValues[key], newValue: payload[key] };
    });

    (chrome.storage.onChanged.addListener as jest.Mock).mock.calls.forEach(([listener]) => {
      listener(changes, area);
    });

    if (cb) cb();
  });
}

wireArea('sync');
wireArea('local');
