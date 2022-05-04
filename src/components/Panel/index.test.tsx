import { render, screen } from '@testing-library/react';

import Panel from '.';

describe('src/components/Panel', () => {
  it('should render any components within', async () => {
    let contentText = 'some random content';
    render(<Panel label='display-label'>{contentText}</Panel>)
    
    const panel = await screen.getByTestId('panel');
    expect(panel).toBeTruthy();
    
    const panelLabel = await screen.getByTestId('panel-label');
    expect(panelLabel.textContent).toBe('display-label');
    
    const panelContent = await screen.getByTestId('panel-content');
    expect(panelContent.textContent).toBe(contentText);
  });
});