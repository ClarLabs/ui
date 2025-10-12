# Storybook Documentation

This project includes a comprehensive Storybook setup for interactive component development and documentation.

## Getting Started

### Development Mode

Run Storybook in development mode with hot-reload:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Build Static Version

Build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

The output will be in the `storybook-static` directory.

## Component Stories

We have created interactive stories for the following components:

### Form Components

- **Button** - All variants, sizes, states (loading, disabled, full-width)
- **Input** - Sizes, variants, with icons, labels, helper text, and errors
- **Textarea** - Sizes, variants, resize options
- **Checkbox** - States including indeterminate, groups
- **Dropdown** - Options, disabled states, long lists

### Layout Components

- **Card** - With images, titles, footers, hoverable, clickable
- **Modal** - All sizes, with/without footer, close behaviors
- **Tabs** - Variants (default, pills, underline), with icons, disabled tabs
- **Accordion** - Single/multiple open, default open items

### Feedback Components

- **Alert** - All variants (info, success, warning, error), dismissible
- **Toast** - Context-based notifications with positions and durations
- **Spinner** - Sizes, variants, with labels
- **ProgressBar** - Variants, striped, animated, with labels
- **Pagination** - Various page counts and configurations

### Display Components

- **Badge** - All variants and sizes, with dot indicator

## Story Features

Each story includes:

- **Interactive Controls** - Adjust props in real-time using Storybook controls
- **Multiple Variants** - See all component variations at a glance
- **Documentation** - Auto-generated docs from TypeScript types
- **Responsive Preview** - Test components at different viewport sizes
- **Theme Toggle** - Switch between dark and light themes

## Creating New Stories

To add a story for a new component:

1. Create a `ComponentName.stories.tsx` file in the component directory:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './index'

const meta = {
	title: 'Components/ComponentName',
	component: ComponentName,
	parameters: {
		layout: 'centered' // or 'padded', 'fullscreen'
	},
	tags: ['autodocs'],
	argTypes: {
		// Define controls for props
		propName: {
			control: 'select',
			options: ['option1', 'option2']
		}
	}
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		// Default props
	}
}

export const Variant: Story = {
	args: {
		// Variant props
	}
}
```

2. The story will automatically appear in Storybook

## Theme Support

All components support both dark and light themes with automatic synchronization:

### How to Toggle Themes

1. **In the Storybook toolbar**, look for the background color button (usually a paint bucket icon)
2. Click it to see theme options
3. Select either:
    - **Dark** (#1a1a1a) - Default dark theme
    - **Light** (#f5f5f5) - Light theme

When you switch backgrounds, the components automatically update to match the selected theme. The decorator in `.storybook/preview.ts` adds/removes the `light-mode` class on the document root, triggering the theme change across all components.

### How It Works

The theme toggle is implemented using a Storybook decorator that:

1. Monitors the selected background color via Storybook's globals
2. Automatically adds the `light-mode` class to `document.documentElement` when the light background is selected
3. Removes the `light-mode` class when the dark background is selected
4. All component styles respond to the presence/absence of this class

This provides a seamless theme-switching experience that mirrors how themes would work in a production application.

## Deployment

To deploy Storybook to a static hosting service:

1. Build the static version:

    ```bash
    npm run build-storybook
    ```

2. Deploy the `storybook-static` directory to:
    - GitHub Pages
    - Netlify
    - Vercel
    - Any static hosting service

## Configuration

Storybook configuration files:

- `.storybook/main.ts` - Main configuration
- `.storybook/preview.ts` - Global decorators and parameters
- `src/styles/global.scss` - Global styles imported in preview

## Troubleshooting

### Storybook won't start

- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules/.cache/storybook`

### Stories not showing

- Check that your story file ends with `.stories.tsx`
- Verify it's in the `src/components` directory
- Check the browser console for errors

### Styles not loading

- Ensure `src/styles/global.scss` is imported in `.storybook/preview.ts`
- Check that component SCSS modules are properly imported

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Addons](https://storybook.js.org/addons)
