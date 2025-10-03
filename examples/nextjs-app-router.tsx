// Next.js App Router Example Usage
// app/page.tsx

import { Button, Badge, Card, Icon } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

export default function HomePage() {
  return (
    <main className="o-container u-p-8">
      <Card
        title=" Welcome to Atomix with Next.js App Router"
        text=" This example demonstrates how to use @shohojdhara/atomix components 
          in a Next.js application with the App Router."
        actions={
          <>
            <Button variant="primary" size="lg" onClick={() => alert('Primary button clicked!')}>
              Primary Action
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => alert('Secondary button clicked!')}
            >
              Secondary Action
            </Button>
          </>
        }
          icon={<Badge label="New" />}
      ></Card>
    </main>
  );
}
