import {fireEvent, render, screen} from '@testing-library/react';

import Toggle from '.';

describe('/src/components/Toggle', () => {
  it('should properly render the component', () => {
    render(<Toggle on={true} />);
    const toggle = screen.getByTestId('toggle');
    expect(toggle).toBeInTheDocument();
  });

  it('should properly display enabled status', () => {
    render(<Toggle on={true} />);
    const toggle = screen.getByTestId('toggle') as HTMLInputElement;
    expect(toggle.checked).toBe(true);
  });
  
  it('should properly display disabled status', () => {
    render(<Toggle on={false} />);
    const toggle = screen.getByTestId('toggle') as HTMLInputElement;
    expect(toggle.checked).toBe(false);
  });
  
  it('should properly trigger on state change event', () => {
    const callback = jest.fn();
    render(<Toggle on={true} onStateChange={callback} />);
    
    const toggle = screen.getByTestId('toggle');
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, false);
    expect(callback).toHaveBeenNthCalledWith(2, true);
  });
})