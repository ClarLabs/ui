import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './index';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your action was completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please review this warning before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'An error occurred while processing your request.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    message: 'This alert has no title, just a message.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    message: 'Click the X button to dismiss this alert.',
    dismissible: true,
    onDismiss: () => console.log('Alert dismissed'),
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    message: 'This is a longer alert message that demonstrates how the component handles multi-line content. It contains more detailed information that might span across multiple lines to provide comprehensive context to the user.',
    dismissible: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Info" message="Information alert" />
      <Alert variant="success" title="Success" message="Success alert" />
      <Alert variant="warning" title="Warning" message="Warning alert" />
      <Alert variant="error" title="Error" message="Error alert" />
    </div>
  ),
};
