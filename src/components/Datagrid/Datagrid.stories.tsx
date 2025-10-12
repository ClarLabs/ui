import type { Meta, StoryObj } from '@storybook/react';
import { Datagrid } from './index';

const columns = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
];

const meta = {
  title: 'Components/Datagrid',
  component: Datagrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Datagrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data,
  },
};

export const Striped: Story = {
  args: {
    columns,
    data,
    striped: true,
  },
};

export const Hoverable: Story = {
  args: {
    columns,
    data,
    hoverable: true,
  },
};

export const Clickable: Story = {
  args: {
    columns,
    data,
    hoverable: true,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '80px' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      {
        key: 'status',
        header: 'Status',
        render: (value) => (
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            background: value === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color: value === 'Active' ? '#4ade80' : '#f87171'
          }}>
            {value}
          </span>
        ),
      },
    ],
    data,
    striped: true,
    hoverable: true,
  },
};

export const ManyRows: Story = {
  args: {
    columns,
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Manager'][i % 3],
      status: ['Active', 'Inactive'][i % 2],
    })),
    striped: true,
    hoverable: true,
  },
};
