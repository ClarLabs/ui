import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './index';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: new Date('2024-03-15'),
  },
};

export const WithMinDate: Story = {
  args: {
    minDate: new Date(),
  },
};

export const WithMaxDate: Story = {
  args: {
    maxDate: new Date('2024-12-31'),
  },
};

export const WithRange: Story = {
  args: {
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-12-31'),
    value: new Date('2024-06-15'),
  },
};

export const Disabled: Story = {
  args: {
    value: new Date('2024-03-15'),
    disabled: true,
  },
};
