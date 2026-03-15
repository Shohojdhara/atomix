import { Button } from './Button';

export const DisabledLinkExample = {
  render: () => (
    <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
      <Button href="/home" disabled>Disabled Link Button</Button>
      <Button href="/home">Normal Link Button</Button>
    </div>
  ),
};
