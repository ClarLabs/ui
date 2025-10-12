import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './index';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label Text',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Label',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Label',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Label',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
    </div>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="email" required>Email Address</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        style={{
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(40, 40, 50, 0.8)',
          color: '#e0e0e0',
        }}
      />
    </div>
  ),
};
