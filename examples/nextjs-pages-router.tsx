// Next.js Pages Router Example Usage
// pages/index.tsx

import { useState } from 'react';
import { Button, Badge, Card, Modal } from '@shohojdhara/atomix';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <Card>
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Atomix with Next.js Pages Router
        </h1>
        
        <div className="flex gap-4 items-center mb-6">
          <Badge variant="primary" size="md">
            ✨ SSR Compatible
          </Badge>
          
          <Badge variant="success" size="sm">
            Tree Shakable
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-6">
          This example demonstrates how to use @shohojdhara/atomix components 
          in a Next.js application with the Pages Router, including client-side interactions.
        </p>
        
        <div className="flex gap-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => alert('This works with SSR!')}
          >
            SSR Action
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Atomix Modal Example"
      >
        <p>This modal component works perfectly with Next.js!</p>
        <div className="mt-4 flex gap-2">
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Don't forget to import CSS in pages/_app.tsx:
// import '@shohojdhara/atomix/css';
