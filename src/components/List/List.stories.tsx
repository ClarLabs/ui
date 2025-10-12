import type { Meta, StoryObj } from '@storybook/react';
import { List } from './index';

const items = [
  { id: '1', content: 'First item' },
  { id: '2', content: 'Second item' },
  { id: '3', content: 'Third item' },
  { id: '4', content: 'Fourth item' },
];

const itemsWithIcons = [
  { id: '1', content: 'Home', icon: '🏠' },
  { id: '2', content: 'Profile', icon: '👤' },
  { id: '3', content: 'Settings', icon: '⚙️' },
  { id: '4', content: 'Logout', icon: '🚪' },
];

const itemsWithBadges = [
  { id: '1', content: 'Inbox', badge: '5' },
  { id: '2', content: 'Drafts', badge: '2' },
  { id: '3', content: 'Sent' },
  { id: '4', content: 'Trash', badge: '12' },
];

const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: 'boolean',
    },
    dividers: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items,
  },
};

export const Hoverable: Story = {
  args: {
    items,
    hoverable: true,
  },
};

export const WithDividers: Story = {
  args: {
    items,
    dividers: true,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    hoverable: true,
  },
};

export const WithBadges: Story = {
  args: {
    items: itemsWithBadges,
    hoverable: true,
    dividers: true,
  },
};

export const Clickable: Story = {
  args: {
    items: items.map(item => ({
      ...item,
      onClick: () => alert(`Clicked: ${item.content}`),
    })),
    hoverable: true,
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { id: '1', content: 'Active item', icon: '✓' },
      { id: '2', content: 'Disabled item', disabled: true, icon: '✕' },
      { id: '3', content: 'Active item', icon: '✓' },
      { id: '4', content: 'Disabled item', disabled: true, icon: '✕' },
    ],
    hoverable: true,
  },
};

export const AllFeatures: Story = {
  args: {
    items: [
      { id: '1', content: 'Inbox', icon: '📥', badge: '5', onClick: () => console.log('Inbox') },
      { id: '2', content: 'Starred', icon: '⭐', badge: '2', onClick: () => console.log('Starred') },
      { id: '3', content: 'Sent', icon: '📤', onClick: () => console.log('Sent') },
      { id: '4', content: 'Drafts', icon: '📝', badge: '1', onClick: () => console.log('Drafts') },
      { id: '5', content: 'Spam', icon: '🚫', disabled: true },
      { id: '6', content: 'Trash', icon: '🗑️', badge: '12', onClick: () => console.log('Trash') },
    ],
    hoverable: true,
    dividers: true,
  },
};
