'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function FormPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Form</h1>
        <p>
          The Form component provides a structured way to collect user input with built-in validation, 
          styling, and accessibility features. It includes various form controls like inputs, selects, 
          checkboxes, and more.
        </p>

        <ComponentDemo
          title="Basic Form"
          description="A simple form with various input types"
          code={`<form className="c-form">
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="name">Name</label>
    <input 
      type="text" 
      className="c-form__input" 
      id="name" 
      placeholder="Enter your name"
    />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="email">Email</label>
    <input 
      type="email" 
      className="c-form__input" 
      id="email" 
      placeholder="Enter your email"
    />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="password">Password</label>
    <input 
      type="password" 
      className="c-form__input" 
      id="password" 
      placeholder="Enter your password"
    />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="country">Country</label>
    <select className="c-form__select" id="country">
      <option value="">Select your country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
      <option value="au">Australia</option>
    </select>
  </div>
  
  <div className="c-form__group">
    <div className="c-form__check">
      <input 
        type="checkbox" 
        className="c-form__check-input" 
        id="terms" 
      />
      <label className="c-form__check-label" htmlFor="terms">
        I agree to the terms and conditions
      </label>
    </div>
  </div>
  
  <div className="c-form__group">
    <button type="submit" className="c-button c-button--primary">
      Submit
    </button>
  </div>
</form>`}
        >
          <form className="c-form">
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="name">Name</label>
              <input 
                type="text" 
                className="c-form__input" 
                id="name" 
                placeholder="Enter your name"
              />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="email">Email</label>
              <input 
                type="email" 
                className="c-form__input" 
                id="email" 
                placeholder="Enter your email"
              />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="password">Password</label>
              <input 
                type="password" 
                className="c-form__input" 
                id="password" 
                placeholder="Enter your password"
              />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="country">Country</label>
              <select className="c-form__select" id="country">
                <option value="">Select your country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
              </select>
            </div>
            
            <div className="c-form__group">
              <div className="c-form__check">
                <input 
                  type="checkbox" 
                  className="c-form__check-input" 
                  id="terms" 
                />
                <label className="c-form__check-label" htmlFor="terms">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            
            <div className="c-form__group">
              <button type="submit" className="c-button c-button--primary">
                Submit
              </button>
            </div>
          </form>
        </ComponentDemo>

        <ComponentDemo
          title="Form with Validation"
          description="Form with validation states and feedback messages"
          code={`<form className="c-form">
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="username">Username</label>
    <input 
      type="text" 
      className="c-form__input c-form__input--valid" 
      id="username" 
      value="johndoe"
    />
    <div className="c-form__feedback c-form__feedback--valid">
      Username is available
    </div>
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="email-invalid">Email</label>
    <input 
      type="email" 
      className="c-form__input c-form__input--invalid" 
      id="email-invalid" 
      value="invalid-email"
    />
    <div className="c-form__feedback c-form__feedback--invalid">
      Please enter a valid email address
    </div>
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="password-strength">Password</label>
    <input 
      type="password" 
      className="c-form__input c-form__input--warning" 
      id="password-strength" 
      value="pass123"
    />
    <div className="c-form__feedback c-form__feedback--warning">
      Password is too weak. Consider adding special characters.
    </div>
  </div>
  
  <div className="c-form__group">
    <button type="submit" className="c-button c-button--primary">
      Submit
    </button>
  </div>
</form>`}
        >
          <form className="c-form">
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="username">Username</label>
              <input 
                type="text" 
                className="c-form__input c-form__input--valid" 
                id="username" 
                value="johndoe"
                readOnly
              />
              <div className="c-form__feedback c-form__feedback--valid">
                Username is available
              </div>
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="email-invalid">Email</label>
              <input 
                type="email" 
                className="c-form__input c-form__input--invalid" 
                id="email-invalid" 
                value="invalid-email"
                readOnly
              />
              <div className="c-form__feedback c-form__feedback--invalid">
                Please enter a valid email address
              </div>
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="password-strength">Password</label>
              <input 
                type="password" 
                className="c-form__input c-form__input--warning" 
                id="password-strength" 
                value="pass123"
                readOnly
              />
              <div className="c-form__feedback c-form__feedback--warning">
                Password is too weak. Consider adding special characters.
              </div>
            </div>
            
            <div className="c-form__group">
              <button type="submit" className="c-button c-button--primary">
                Submit
              </button>
            </div>
          </form>
        </ComponentDemo>

        <ComponentDemo
          title="Inline Form"
          description="Form with inline layout for compact spaces"
          code={`<form className="c-form c-form--inline">
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="inline-name">Name</label>
    <input 
      type="text" 
      className="c-form__input" 
      id="inline-name" 
      placeholder="Name"
    />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="inline-email">Email</label>
    <input 
      type="email" 
      className="c-form__input" 
      id="inline-email" 
      placeholder="Email"
    />
  </div>
  
  <div className="c-form__group">
    <button type="submit" className="c-button c-button--primary">
      Subscribe
    </button>
  </div>
</form>`}
        >
          <form className="c-form c-form--inline">
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="inline-name">Name</label>
              <input 
                type="text" 
                className="c-form__input" 
                id="inline-name" 
                placeholder="Name"
              />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="inline-email">Email</label>
              <input 
                type="email" 
                className="c-form__input" 
                id="inline-email" 
                placeholder="Email"
              />
            </div>
            
            <div className="c-form__group">
              <button type="submit" className="c-button c-button--primary">
                Subscribe
              </button>
            </div>
          </form>
        </ComponentDemo>

        <ComponentDemo
          title="Form with Input Groups"
          description="Form inputs with prepended and appended elements"
          code={`<form className="c-form">
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="username-input">Username</label>
    <div className="c-form__input-group">
      <div className="c-form__input-group-prepend">
        <span className="c-form__input-group-text">@</span>
      </div>
      <input 
        type="text" 
        className="c-form__input" 
        id="username-input" 
        placeholder="Username"
      />
    </div>
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="website-input">Website</label>
    <div className="c-form__input-group">
      <div className="c-form__input-group-prepend">
        <span className="c-form__input-group-text">https://</span>
      </div>
      <input 
        type="text" 
        className="c-form__input" 
        id="website-input" 
        placeholder="example.com"
      />
    </div>
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="price-input">Price</label>
    <div className="c-form__input-group">
      <div className="c-form__input-group-prepend">
        <span className="c-form__input-group-text">$</span>
      </div>
      <input 
        type="number" 
        className="c-form__input" 
        id="price-input" 
        placeholder="0.00"
      />
      <div className="c-form__input-group-append">
        <span className="c-form__input-group-text">.00</span>
      </div>
    </div>
  </div>
  
  <div className="c-form__group">
    <button type="submit" className="c-button c-button--primary">
      Submit
    </button>
  </div>
</form>`}
        >
          <form className="c-form">
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="username-input">Username</label>
              <div className="c-form__input-group">
                <div className="c-form__input-group-prepend">
                  <span className="c-form__input-group-text">@</span>
                </div>
                <input 
                  type="text" 
                  className="c-form__input" 
                  id="username-input" 
                  placeholder="Username"
                />
              </div>
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="website-input">Website</label>
              <div className="c-form__input-group">
                <div className="c-form__input-group-prepend">
                  <span className="c-form__input-group-text">https://</span>
                </div>
                <input 
                  type="text" 
                  className="c-form__input" 
                  id="website-input" 
                  placeholder="example.com"
                />
              </div>
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="price-input">Price</label>
              <div className="c-form__input-group">
                <div className="c-form__input-group-prepend">
                  <span className="c-form__input-group-text">$</span>
                </div>
                <input 
                  type="number" 
                  className="c-form__input" 
                  id="price-input" 
                  placeholder="0.00"
                />
                <div className="c-form__input-group-append">
                  <span className="c-form__input-group-text">.00</span>
                </div>
              </div>
            </div>
            
            <div className="c-form__group">
              <button type="submit" className="c-button c-button--primary">
                Submit
              </button>
            </div>
          </form>
        </ComponentDemo>

        <ComponentDemo
          title="Form with Horizontal Layout"
          description="Form with labels and controls in a horizontal layout"
          code={`<form className="c-form c-form--horizontal">
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="horizontal-email">Email</label>
    <div className="c-form__control-wrapper">
      <input 
        type="email" 
        className="c-form__input" 
        id="horizontal-email" 
        placeholder="Email"
      />
    </div>
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="horizontal-password">Password</label>
    <div className="c-form__control-wrapper">
      <input 
        type="password" 
        className="c-form__input" 
        id="horizontal-password" 
        placeholder="Password"
      />
      <small className="c-form__text">Your password must be 8-20 characters long.</small>
    </div>
  </div>
  
  <div className="c-form__group">
    <div className="c-form__label">Remember me</div>
    <div className="c-form__control-wrapper">
      <div className="c-form__check">
        <input 
          type="checkbox" 
          className="c-form__check-input" 
          id="horizontal-remember" 
        />
        <label className="c-form__check-label" htmlFor="horizontal-remember">
          Keep me signed in
        </label>
      </div>
    </div>
  </div>
  
  <div className="c-form__group">
    <div className="c-form__label"></div>
    <div className="c-form__control-wrapper">
      <button type="submit" className="c-button c-button--primary">
        Sign in
      </button>
    </div>
  </div>
</form>`}
        >
          <form className="c-form c-form--horizontal">
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="horizontal-email">Email</label>
              <div className="c-form__control-wrapper">
                <input 
                  type="email" 
                  className="c-form__input" 
                  id="horizontal-email" 
                  placeholder="Email"
                />
              </div>
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="horizontal-password">Password</label>
              <div className="c-form__control-wrapper">
                <input 
                  type="password" 
                  className="c-form__input" 
                  id="horizontal-password" 
                  placeholder="Password"
                />
                <small className="c-form__text">Your password must be 8-20 characters long.</small>
              </div>
            </div>
            
            <div className="c-form__group">
              <div className="c-form__label">Remember me</div>
              <div className="c-form__control-wrapper">
                <div className="c-form__check">
                  <input 
                    type="checkbox" 
                    className="c-form__check-input" 
                    id="horizontal-remember" 
                  />
                  <label className="c-form__check-label" htmlFor="horizontal-remember">
                    Keep me signed in
                  </label>
                </div>
              </div>
            </div>
            
            <div className="c-form__group">
              <div className="c-form__label"></div>
              <div className="c-form__control-wrapper">
                <button type="submit" className="c-button c-button--primary">
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </ComponentDemo>

        <h2 className="u-mt-8">Form Controls</h2>
        
        <ComponentDemo
          title="Input Types"
          description="Various input types supported by the form component"
          code={`<form className="c-form">
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="text-input">Text</label>
    <input type="text" className="c-form__input" id="text-input" placeholder="Text input" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="number-input">Number</label>
    <input type="number" className="c-form__input" id="number-input" placeholder="Number input" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="email-input">Email</label>
    <input type="email" className="c-form__input" id="email-input" placeholder="Email input" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="password-input">Password</label>
    <input type="password" className="c-form__input" id="password-input" placeholder="Password input" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="date-input">Date</label>
    <input type="date" className="c-form__input" id="date-input" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="time-input">Time</label>
    <input type="time" className="c-form__input" id="time-input" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="color-input">Color</label>
    <input type="color" className="c-form__input c-form__input--color" id="color-input" value="#4263eb" />
  </div>
  
  <div className="c-form__group">
    <label className="c-form__label" htmlFor="range-input">Range</label>
    <input type="range" className="c-form__range" id="range-input" min="0" max="100" value="50" />
  </div>
</form>`}
        >
          <form className="c-form">
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="text-input">Text</label>
              <input type="text" className="c-form__input" id="text-input" placeholder="Text input" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="number-input">Number</label>
              <input type="number" className="c-form__input" id="number-input" placeholder="Number input" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="email-input">Email</label>
              <input type="email" className="c-form__input" id="email-input" placeholder="Email input" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="password-input">Password</label>
              <input type="password" className="c-form__input" id="password-input" placeholder="Password input" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="date-input">Date</label>
              <input type="date" className="c-form__input" id="date-input" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="time-input">Time</label>
              <input type="time" className="c-form__input" id="time-input" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="color-input">Color</label>
              <input type="color" className="c-form__input c-form__input--color" id="color-input" defaultValue="#4263eb" />
            </div>
            
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="range-input">Range</label>
              <input type="range" className="c-form__range" id="range-input" min="0" max="100" defaultValue="50" />
            </div>
          </form>
        </ComponentDemo>

        <h2 className="u-mt-8">Props</h2>
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
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>className</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>layout</code></td>
                <td className="c-data-table__cell"><code>'vertical' | 'horizontal' | 'inline'</code></td>
                <td className="c-data-table__cell">Form layout style</td>
                <td className="c-data-table__cell"><code>'vertical'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onSubmit</code></td>
                <td className="c-data-table__cell"><code>(event: React.FormEvent) => void</code></td>
                <td className="c-data-table__cell">Form submission handler</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>disabled</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Disables all form controls</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>noValidate</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Disables browser's native form validation</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="u-mt-6">Form.Input Props</h3>
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
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>type</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Input type (text, email, password, etc.)</td>
                <td className="c-data-table__cell"><code>'text'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>value</code></td>
                <td className="c-data-table__cell"><code>string | number</code></td>
                <td className="c-data-table__cell">Input value</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onChange</code></td>
                <td className="c-data-table__cell"><code>(event: React.ChangeEvent) => void</code></td>
                <td className="c-data-table__cell">Change event handler</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>placeholder</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Input placeholder text</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>disabled</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the input is disabled</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>readOnly</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the input is read-only</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>required</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the input is required</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>validationState</code></td>
                <td className="c-data-table__cell"><code>'valid' | 'invalid' | 'warning' | null</code></td>
                <td className="c-data-table__cell">Input validation state</td>
                <td className="c-data-table__cell"><code>null</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>feedback</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Validation feedback message</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The Form component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">All form controls have associated labels with proper <code>for</code> attributes</li>
          <li className="c-list__item">Required fields are marked with both visual indicators and <code>aria-required</code> attributes</li>
          <li className="c-list__item">Error messages are linked to inputs using <code>aria-describedby</code></li>
          <li className="c-list__item">Form validation provides clear feedback for screen readers</li>
          <li className="c-list__item">Focus states are clearly visible for keyboard navigation</li>
          <li className="c-list__item">Form groups maintain a logical tab order</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use clear, concise labels for form fields</li>
          <li className="c-list__item">Group related form controls together</li>
          <li className="c-list__item">Provide helpful placeholder text when appropriate</li>
          <li className="c-list__item">Use validation to provide immediate feedback on user input</li>
          <li className="c-list__item">Include clear error messages that explain how to fix issues</li>
          <li className="c-list__item">Consider using horizontal layout for shorter forms and vertical layout for longer forms</li>
          <li className="c-list__item">Use inline forms sparingly and only for very simple inputs</li>
          <li className="c-list__item">Ensure sufficient spacing between form elements for readability</li>
          <li className="c-list__item">Make sure required fields are clearly indicated</li>
          <li className="c-list__item">Consider the tab order of your form for keyboard users</li>
        </ul>
      </div>
    </DocsLayout>
  )
}