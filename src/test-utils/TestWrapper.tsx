import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect'

type Props = {
  children: ReactNode;
};

export default function ({ children }: Props) {
  return <MemoryRouter>
    {children}
  </MemoryRouter>;
}