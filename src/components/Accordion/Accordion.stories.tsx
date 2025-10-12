import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './index';

const sampleItems = [
  {
    id: '1',
    title: 'What is this UI Kit?',
    content: 'This is a modern UI component library built with React and TypeScript, featuring glassmorphism design and dark/light theme support.',
  },
  {
    id: '2',
    title: 'How do I install it?',
    content: 'Install using npm: npm install @clarlabs/ui. Then import the components you need and the CSS file.',
  },
  {
    id: '3',
    title: 'Does it support dark mode?',
    content: 'Yes! All components support both light and dark themes with beautiful glassmorphism effects.',
  },
  {
    id: '4',
    title: 'Is it responsive?',
    content: 'Absolutely. All components are built with responsive design in mind and work great on mobile, tablet, and desktop devices.',
  },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items to be open at once',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
  },
};

export const WithDefaultOpen: Story = {
  args: {
    items: sampleItems,
    defaultOpenIds: ['1', '3'],
    allowMultiple: true,
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        id: '5',
        title: 'Can I customize the styles?',
        content: 'Yes, all components use CSS modules which can be customized or overridden.',
      },
      {
        id: '6',
        title: 'Is TypeScript supported?',
        content: 'Yes! The library is written in TypeScript and includes full type definitions.',
      },
      {
        id: '7',
        title: 'Are there any dependencies?',
        content: 'The library has peer dependencies on React and React-DOM. SCSS is used for styling.',
      },
    ],
  },
};
