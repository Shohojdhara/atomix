// Next.js App Router Example Usage
// app/page.tsx

import { Button, Badge, Card } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

export default function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <Card>
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Atomix with Next.js App Router
        </h1>
        
        <div className="flex gap-4 items-center mb-6">
          <Badge variant="primary" size="md">
            ✨ New
          </Badge>
          
          <Badge variant="success" size="sm">
            Compatible
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-6">
          This example demonstrates how to use @shohojdhara/atomix components 
          in a Next.js application with the App Router.
        </p>
        
        <div className="flex gap-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => alert('Primary button clicked!')}
          >
            Primary Action
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => alert('Secondary button clicked!')}
          >
            Secondary Action
          </Button>
        </div>
      </Card>
    </main>
  );
}
