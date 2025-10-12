# @clarlabs/ui

A modern, lightweight UI component library for React applications.

## Installation

```bash
npm install @clarlabs/ui
```

or

```bash
yarn add @clarlabs/ui
```

or

```bash
pnpm add @clarlabs/ui
```

## Usage

### Basic Example

```tsx
import { Button, Input } from '@clarlabs/ui'

function App() {
	return (
		<div>
			<Button variant="primary" size="md">
				Click me
			</Button>

			<Input label="Email" type="email" placeholder="Enter your email" />
		</div>
	)
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**

- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost'` - Button style variant (default: `'primary'`)
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: `'md'`)
- `fullWidth?: boolean` - Whether button should take full width (default: `false`)
- All standard HTML button attributes are supported

**Example:**

```tsx
import { Button } from '@clarlabs/ui'

function Example() {
	return (
		<>
			<Button variant="primary" size="lg">
				Primary Button
			</Button>

			<Button variant="outline" size="sm" onClick={() => console.log('clicked')}>
				Small Outline
			</Button>

			<Button variant="ghost" disabled>
				Disabled Ghost
			</Button>
		</>
	)
}
```

### Input

A flexible input component with label, error, and helper text support.

**Props:**

- `label?: string` - Label text for the input
- `error?: string` - Error message to display
- `helperText?: string` - Helper text to display below input
- `fullWidth?: boolean` - Whether input should take full width (default: `false`)
- All standard HTML input attributes are supported

**Example:**

```tsx
import { Input } from '@clarlabs/ui'

function Example() {
	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	return (
		<>
			<Input
				label="Username"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Enter username"
				helperText="Choose a unique username"
			/>

			<Input label="Email" type="email" error={error} fullWidth />
		</>
	)
}
```

## Development

### Prerequisites

- Node.js 16+
- npm/yarn/pnpm

### Setup

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run typecheck
```

### Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   └── index.ts
│   └── Input/
│       ├── Input.tsx
│       ├── Input.css
│       └── index.ts
└── index.ts
```

## Publishing

This package is configured for publishing to NPM. To publish:

1. Update version in `package.json`
2. Build the package: `npm run build`
3. Publish: `npm publish`

The package is configured with `"access": "public"` for scoped packages.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
