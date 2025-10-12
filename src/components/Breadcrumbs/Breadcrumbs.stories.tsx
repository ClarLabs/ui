import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './index';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About' },
    ],
  },
};

export const ManyLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Navigation', href: '/docs/components/navigation' },
      { label: 'Breadcrumbs', href: '/docs/components/navigation/breadcrumbs' },
      { label: 'Examples' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Article' },
    ],
    separator: '→',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Dashboard', onClick: () => console.log('Navigate to Dashboard') },
      { label: 'Settings', onClick: () => console.log('Navigate to Settings') },
      { label: 'Profile', onClick: () => console.log('Navigate to Profile') },
      { label: 'Edit' },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Very Long Category Name Here', href: '/category' },
      { label: 'Even Longer Subcategory Name', href: '/category/subcategory' },
      { label: 'Current Page with Long Title' },
    ],
  },
};
