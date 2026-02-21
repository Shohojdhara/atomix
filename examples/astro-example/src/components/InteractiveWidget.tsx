import { useState } from 'react';
import { Button, Callout } from '@shohojdhara/atomix';

export default function InteractiveWidget() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(!show)}>Toggle Callout (Client)</Button>
      {show && (
        <Callout variant="info" className="mt-4">
          This is a React component managing its own state, powered by Atomix inside Astro!
        </Callout>
      )}
    </div>
  );
}
