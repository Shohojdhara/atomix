import React from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
import { Tab } from './Tab';

export default {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
    activeIndex: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    onTabChange: { action: 'tab changed' },
  },
} as Meta<typeof Tab>;

const Template: StoryFn<typeof Tab> = args => (
  <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
    <Tab {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      label: 'Tab 1',
      content: <p>This is the content for Tab 1. Default tab content.</p>,
    },
    {
      label: 'Tab 2',
      content: <p>This is the content for Tab 2. It contains different information.</p>,
    },
    {
      label: 'Tab 3',
      content: <p>This is the content for Tab 3. Another unique content section.</p>,
    },
  ],
  activeIndex: 0,
};

export const WithDifferentActiveTab = Template.bind({});
WithDifferentActiveTab.args = {
  items: [
    {
      label: 'Tab 1',
      content: <p>This is the content for Tab 1.</p>,
    },
    {
      label: 'Tab 2',
      content: <p>This is the content for Tab 2. It's initially active.</p>,
    },
    {
      label: 'Tab 3',
      content: <p>This is the content for Tab 3.</p>,
    },
  ],
  activeIndex: 1,
};

export const WithRichContent = Template.bind({});
WithRichContent.args = {
  items: [
    {
      label: 'Features',
      content: (
        <div>
          <h3>Key Features</h3>
          <ul>
            <li>Responsive design</li>
            <li>Accessible navigation</li>
            <li>Smooth transitions</li>
          </ul>
        </div>
      ),
    },
    {
      label: 'Specifications',
      content: (
        <div>
          <h3>Technical Specifications</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  Property
                </th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Size</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Medium</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Material</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Aluminum</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      label: 'Reviews',
      content: (
        <div>
          <h3>Customer Reviews</h3>
          <div style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
            <p style={{ marginBottom: '5px' }}>
              <strong>John D.</strong> ★★★★★
            </p>
            <p>Great product, highly recommended!</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
            <p style={{ marginBottom: '5px' }}>
              <strong>Sarah T.</strong> ★★★★☆
            </p>
            <p>Very good quality and fast shipping.</p>
          </div>
        </div>
      ),
    },
  ],
  activeIndex: 0,
};
