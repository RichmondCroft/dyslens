import { fireEvent,render,screen } from "@testing-library/react";

import BackButton from ".";

it("should render the component",()=>{
    render(<BackButton/>);
    const icon = screen.getByTestId("button-icon");
    expect(icon).toBeInTheDocument()
})