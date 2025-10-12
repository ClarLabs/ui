import type { Meta, StoryObj } from '@storybook/react';
import { VerticalNav } from './index';

const navItems = [
  { id: '1', label: 'Dashboard', icon: '📊', href: '/' },
  { id: '2', label: 'Users', icon: '👥', href: '/users' },
  { id: '3', label: 'Settings', icon: '⚙️', href: '/settings' },
  { id: '4', label: 'Logout', icon: '🚪', href: '/logout' },
];

const nestedItems = [
  { id: '1', label: 'Home', icon: '🏠' },
  {
    id: '2',
    label: 'Products',
    icon: '📦',
    children: [
      { id: '2-1', label: 'All Products' },
      { id: '2-2', label: 'Categories' },
      { id: '2-3', label: 'Inventory' },
    ],
  },
  {
    id: '3',
    label: 'Orders',
    icon: '🛒',
    children: [
      { id: '3-1', label: 'Pending' },
      { id: '3-2', label: 'Completed' },
      { id: '3-3', label: 'Cancelled' },
    ],
  },
  { id: '4', label: 'Settings', icon: '⚙️' },
];

const withBadges = [
  { id: '1', label: 'Inbox', icon: '📥', badge: '12' },
  { id: '2', label: 'Starred', icon: '⭐', badge: '3' },
  { id: '3', label: 'Sent', icon: '📤' },
  { id: '4', label: 'Drafts', icon: '📝', badge: '5' },
  { id: '5', label: 'Trash', icon: '🗑️' },
];

const meta = {
  title: 'Components/VerticalNav',
  component: VerticalNav,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    collapsed: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof VerticalNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    items: navItems,
    orientation: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    items: navItems,
    orientation: 'horizontal',
  },
};

export const WithNesting: Story = {
  args: {
    items: nestedItems,
    orientation: 'vertical',
    defaultExpandedIds: ['2'],
  },
};

export const WithBadges: Story = {
  args: {
    items: withBadges,
    orientation: 'vertical',
  },
};

export const Collapsed: Story = {
  args: {
    items: navItems,
    orientation: 'vertical',
    collapsed: true,
  },
};

export const Clickable: Story = {
  args: {
    items: navItems,
    orientation: 'vertical',
    onItemClick: (item) => alert(`Clicked: ${item.label}`),
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', icon: '🏠' },
      { id: '2', label: 'Profile', icon: '👤' },
      { id: '3', label: 'Settings (Disabled)', icon: '⚙️', disabled: true },
      { id: '4', label: 'Help', icon: '❓' },
    ],
    orientation: 'vertical',
  },
};

export const MegaMenu: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', icon: '🏠' },
      {
        id: '2',
        label: 'Products',
        icon: '📦',
        megaMenu: true,
        children: [
          {
            id: '2-1',
            label: 'Electronics',
            children: [
              { id: '2-1-1', label: 'Phones' },
              { id: '2-1-2', label: 'Laptops' },
            ],
          },
          {
            id: '2-2',
            label: 'Clothing',
            children: [
              { id: '2-2-1', label: 'Men' },
              { id: '2-2-2', label: 'Women' },
            ],
          },
        ],
      },
      { id: '3', label: 'About', icon: 'ℹ️' },
    ],
    orientation: 'horizontal',
  },
};
