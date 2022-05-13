import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import COLORS from "./constants/colors";

jest.mock('./storage/chrome-storage.ts', () => ({
  fetchAppStateFromStorage: () => Promise.resolve({
    enabled: false,
    text: {},
    overlay: {
      enabled: false,
      color: ''
    }
  })
}));

describe('src/App.tsx', () => {
  beforeEach(() => {
    act(() => {
      global.chrome = {
        storage: {
          sync: {
            get: () => (Promise.resolve({
              enabled: false,
              text: {},
              overlay: {
                enabled: false,
                color: COLORS.LIGHT_YELLOW
              }
            }))
          } as any
        } as any
      } as any
    });
  });

  it("renders dyslens app without any problem", async () => {
    await act(async () => {
      await render(<App />);
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });

  it('should be able to render the app once the memory is read', async () => {
    await act(async () => {
      await render(<App />);
    });
    await new Promise(process.nextTick);
    expect(screen.getByTestId('dyslensText')).toBeInTheDocument();
  });
});
