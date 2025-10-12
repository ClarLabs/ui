import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './index';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    defaultChecked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Accept terms and conditions" />
      <Checkbox label="Subscribe to newsletter" defaultChecked />
      <Checkbox label="Enable notifications" />
      <Checkbox label="Keep me logged in" defaultChecked />
    </div>
  ),
};
