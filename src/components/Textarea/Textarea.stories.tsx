import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './index';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Add your comments here...',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    error: 'Message is required',
    rows: 4,
  },
};

export const Success: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    variant: 'success',
    helperText: 'Message looks good!',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit',
    disabled: true,
    rows: 4,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small textarea',
    rows: 3,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large textarea',
    rows: 5,
  },
};

export const NoResize: Story = {
  args: {
    label: 'Fixed Size',
    placeholder: 'This textarea cannot be resized',
    resize: 'none',
    rows: 4,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Textarea',
    placeholder: 'This spans the full width',
    fullWidth: true,
    rows: 4,
  },
  parameters: {
    layout: 'padded',
  },
};
