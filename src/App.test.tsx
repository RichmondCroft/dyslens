import { render } from "@testing-library/react";
import App from "./App";

test("renders dyslens link", () => {
  const { getByText } = render(<App />);

  expect(getByText(/dyslens/i)).toBeInTheDocument();
});
