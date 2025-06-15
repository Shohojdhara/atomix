// Example Next.js page demonstrating Atomix components with SSR
// This file shows how to use Atomix components in a Next.js application

import React from 'react'
import { GetServerSideProps } from 'next'
import { 
  Hero, 
  Button, 
  Card, 
  Badge, 
  DataTable, 
  Pagination,
  Modal
} from '@shohojdhara/atomix'
import useModal from '@shohojdhara/atomix'

// Example data that could come from an API
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

interface PageProps {
  users: User[]
  totalUsers: number
  currentPage: number
}

// This demonstrates SSR compatibility - data is fetched on the server
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const page = Number(context.query.page) || 1
  
  // Simulate API call
  const users: User[] = Array.from({ length: 10 }, (_, i) => ({
    id: (page - 1) * 10 + i + 1,
    name: `User ${(page - 1) * 10 + i + 1}`,
    email: `user${(page - 1) * 10 + i + 1}@example.com`,
    role: ['Admin', 'User', 'Editor'][Math.floor(Math.random() * 3)],
    status: Math.random() > 0.3 ? 'active' : 'inactive'
  }))

  return {
    props: {
      users,
      totalUsers: 100, // Simulate total count
      currentPage: page
    }
  }
}

const NextJSExamplePage: React.FC<PageProps> = ({ users, totalUsers, currentPage }) => {
  const { isOpen, openModal, closeModal } = useModal()

  // Define table columns
  const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value: number) => <Badge variant="secondary">{value}</Badge>
    },
    {
      key: 'name',
      title: 'Name',
      render: (value: string) => <strong>{value}</strong>
    },
    {
      key: 'email',
      title: 'Email'
    },
    {
      key: 'role',
      title: 'Role',
      render: (value: string) => (
        <Badge variant={value === 'Admin' ? 'primary' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: 'active' | 'inactive') => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>
          {value}
        </Badge>
      )
    }
  ]

  const totalPages = Math.ceil(totalUsers / 10)

  return (
    <div>
      {/* Hero Section - Renders on server */}
      <Hero
        title="Next.js + Atomix Example"
        subtitle="Server-Side Rendered Components"
        text="This page demonstrates Atomix components working seamlessly with Next.js SSR. All components render on the server and hydrate properly on the client."
        alignment="center"
        backgroundImageSrc="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        showOverlay={true}
        actions={
          <div className="u-d-flex u-gap-3 u-justify-content-center">
            <Button variant="primary" label="View Documentation" />
            <Button variant="outline-secondary" label="Open Modal" onClick={openModal} />
          </div>
        }
      />

      <main className="o-container u-py-5">
        {/* User Management Section */}
        <section className="u-mb-5">
          <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-4">
            <div>
              <h2 className="u-h3 u-mb-2">User Management</h2>
              <p className="u-text-muted">
                Manage your users with server-side rendered data
              </p>
            </div>
            <Button variant="primary" label="Add User" onClick={openModal} />
          </div>

          {/* Data Table - SSR Compatible */}
          <Card>
            <div className="c-card__body">
              <DataTable
                data={users}
                columns={columns}
                loading={false}
                emptyMessage="No users found"
                className="u-mb-4"
              />
              
              {/* Pagination - Works with Next.js routing */}
              <div className="u-d-flex u-justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    // Use Next.js router for navigation
                    window.location.href = `?page=${page}`
                  }}
                  showFirstLastButtons={true}
                  showPrevNextButtons={true}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Features Section */}
        <section className="u-mb-5">
          <h2 className="u-h3 u-mb-4 u-text-center">SSR Features</h2>
          <div className="o-grid">
            <div className="o-grid__col o-grid__col--md-4 u-mb-4">
              <Card>
                <div className="c-card__body u-text-center">
                  <Badge variant="success" className="u-mb-3">✓ SSR Ready</Badge>
                  <h3 className="c-card__title">Server Rendering</h3>
                  <p className="c-card__text">
                    All components render on the server for better SEO and performance
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="o-grid__col o-grid__col--md-4 u-mb-4">
              <Card>
                <div className="c-card__body u-text-center">
                  <Badge variant="primary" className="u-mb-3">⚡ Hydration</Badge>
                  <h3 className="c-card__title">Client Hydration</h3>
                  <p className="c-card__text">
                    Components hydrate seamlessly without layout shifts
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="o-grid__col o-grid__col--md-4 u-mb-4">
              <Card>
                <div className="c-card__body u-text-center">
                  <Badge variant="info" className="u-mb-3">🎨 Styling</Badge>
                  <h3 className="c-card__title">CSS-in-JS Free</h3>
                  <p className="c-card__text">
                    No runtime CSS-in-JS means no styling flash during SSR
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Modal - Client-side interactivity */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Add New User"
        size="md"
      >
        <div className="u-p-4">
          <p className="u-mb-4">
            This modal demonstrates client-side interactivity working 
            seamlessly with SSR components.
          </p>
          
          <div className="u-d-flex u-gap-3 u-justify-content-end">
            <Button variant="secondary" label="Cancel" onClick={closeModal} />
            <Button variant="primary" label="Save User" onClick={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NextJSExamplePage

// Additional example: Using Atomix in a Next.js API route
// pages/api/users.ts
/*
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  id: number
  name: string
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]
  
  res.status(200).json(users)
}
*/

// Example: Using Atomix with Next.js App Router
// app/users/page.tsx
/*
import { Button, Card, DataTable } from '@shohojdhara/atomix'

async function getUsers() {
  // This runs on the server
  const res = await fetch('https://api.example.com/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div className="o-container u-py-5">
      <Card>
        <div className="c-card__body">
          <h1 className="c-card__title">Users</h1>
          <DataTable data={users} />
        </div>
      </Card>
    </div>
  )
}
*/