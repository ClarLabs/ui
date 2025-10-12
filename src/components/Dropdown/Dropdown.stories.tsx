import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './index';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options,
    value: 'option2',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options,
    placeholder: 'Select an option (Option 4 is disabled)',
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    placeholder: 'Disabled dropdown',
  },
};

export const LongList: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Select from many options',
  },
};
