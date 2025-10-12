import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    children: <Button>Hover me (Top)</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'bottom',
    children: <Button>Hover me (Bottom)</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'left',
    children: <Button>Hover me (Left)</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'right',
    children: <Button>Hover me (Right)</Button>,
  },
};

export const LongText: Story = {
  args: {
    content: 'This is a much longer tooltip with multiple words that might wrap to multiple lines',
    position: 'top',
    children: <Button>Hover for long text</Button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: 'Appears immediately',
    position: 'top',
    delay: 0,
    children: <Button>Instant tooltip</Button>,
  },
};

export const LongDelay: Story = {
  args: {
    content: 'Takes 1 second to appear',
    position: 'top',
    delay: 1000,
    children: <Button>Slow tooltip</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', padding: '3rem' }}>
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip content="Help information about this feature" position="top">
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'rgba(59, 130, 246, 0.2)',
        color: '#60a5fa',
        cursor: 'help',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        ?
      </span>
    </Tooltip>
  ),
};
