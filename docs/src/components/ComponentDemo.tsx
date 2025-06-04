'use client'

import React, { useState } from 'react'

interface ComponentDemoProps {
  title?: string
  description?: string
  children: React.ReactNode
  code?: string
  props?: Array<{
    name: string
    type: string
    description: string
    default?: string
    required?: boolean
  }>
  className?: string
}

export function ComponentDemo({
  title,
  description,
  children,
  code,
  props,
  className = '',
}: ComponentDemoProps) {
  const [activeTab, setActiveTab] = useState('preview')

  const tabs = [
    { id: 'preview', label: 'Preview' },
    ...(code ? [{ id: 'code', label: 'Code' }] : []),
    ...(props ? [{ id: 'props', label: 'Props' }] : []),
  ]

  return (
    <div className={`component-demo ${className}`}>
      {title && (
        <div className="component-demo__header">
          <h3 className="component-demo__title">{title}</h3>
          {description && (
            <p className="component-demo__description">{description}</p>
          )}
        </div>
      )}

      <div className="component-demo__preview">
        {children}
      </div>

      {(code || props) && (
        <>
          <div className="u-d-flex u-bg-secondary-subtle">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`c-btn c-btn--sm u-border-0 u-rounded-0 ${
                  activeTab === tab.id ? 'c-btn--primary' : 'c-btn--outline-secondary'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="u-d-block">
            {activeTab === 'code' && code && (
              <div className="component-demo__code">
                <pre>
                  <code>{code}</code>
                </pre>
              </div>
            )}

            {activeTab === 'props' && props && (
              <div className="u-p-4">
                <div className="u-overflow-x-auto">
                  <table className="c-data-table">
                    <thead className="c-data-table__header">
                      <tr className="c-data-table__row">
                        <th className="c-data-table__header-cell">Name</th>
                        <th className="c-data-table__header-cell">Type</th>
                        <th className="c-data-table__header-cell">Description</th>
                        <th className="c-data-table__header-cell">Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.map((prop) => (
                        <tr key={prop.name} className="c-data-table__row">
                          <td className="c-data-table__cell">
                            <code>{prop.name}</code>
                            {prop.required && (
                              <span className="u-text-error u-ms-1">*</span>
                            )}
                          </td>
                          <td className="c-data-table__cell">
                            <code>{prop.type}</code>
                          </td>
                          <td className="c-data-table__cell">{prop.description}</td>
                          <td className="c-data-table__cell">
                            {prop.default ? (
                              <code>{prop.default}</code>
                            ) : (
                              <span className="u-text-secondary">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}