import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Split } from './index'

const meta = {
	title: 'Components/Split',
	component: Split,
	parameters: {
		layout: 'fullscreen'
	},
	tags: ['autodocs'],
	argTypes: {
		direction: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Split>

export default meta
type Story = StoryObj<typeof meta>

const PaneContent = ({ title, content }: { title: string; content?: string }) => (
	<div
		style={{
			padding: '2rem',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem'
		}}
	>
		<h3 style={{ color: '#c7d2fe', margin: 0, fontSize: '1.25rem' }}>{title}</h3>
		<p style={{ color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
			{content ||
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
		</p>
	</div>
)

export const Horizontal: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split direction="horizontal">
				{[
					<PaneContent key="left" title="Left Pane" />,
					<PaneContent key="right" title="Right Pane" />
				]}
			</Split>
		</div>
	)
}

export const Vertical: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split direction="vertical">
				{[
					<PaneContent key="top" title="Top Pane" />,
					<PaneContent key="bottom" title="Bottom Pane" />
				]}
			</Split>
		</div>
	)
}

export const CustomInitialSize: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split direction="horizontal" initialSize={30}>
				{[
					<PaneContent key="left" title="30% Wide" />,
					<PaneContent key="right" title="70% Wide" />
				]}
			</Split>
		</div>
	)
}

export const WithMinMax: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split direction="horizontal" initialSize={50} minSize={200} maxSize={600}>
				{[
					<PaneContent
						key="left"
						title="Constrained Pane"
						content="This pane has a minimum width of 200px and maximum width of 600px. Try resizing!"
					/>,
					<PaneContent key="right" title="Other Pane" />
				]}
			</Split>
		</div>
	)
}

export const WithSnapPositions: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split
				direction="horizontal"
				initialSize={50}
				snapPositions={[25, 50, 75]}
				snapThreshold={30}
			>
				{[
					<PaneContent
						key="left"
						title="Snap-enabled Pane"
						content="This split pane will snap to 25%, 50%, and 75% positions when you get close while dragging."
					/>,
					<PaneContent key="right" title="Other Pane" />
				]}
			</Split>
		</div>
	)
}

export const Disabled: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split direction="horizontal" disabled>
				{[
					<PaneContent
						key="left"
						title="Disabled Split"
						content="This split pane cannot be resized."
					/>,
					<PaneContent key="right" title="Right Pane" />
				]}
			</Split>
		</div>
	)
}

export const CustomGutterSize: Story = {
	render: () => (
		<div style={{ height: '500px' }}>
			<Split direction="horizontal" gutterSize={16}>
				{[
					<PaneContent
						key="left"
						title="Left Pane"
						content="This split has a wider gutter (16px) for easier resizing."
					/>,
					<PaneContent key="right" title="Right Pane" />
				]}
			</Split>
		</div>
	)
}

export const WithCallback: Story = {
	render: () => {
		const [size, setSize] = useState(50)

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '500px' }}>
				<div
					style={{
						padding: '1rem',
						background: 'rgba(99, 102, 241, 0.1)',
						border: '1px solid rgba(99, 102, 241, 0.3)',
						borderRadius: '0.5rem',
						color: '#c7d2fe',
						textAlign: 'center'
					}}
				>
					Left pane size: {size.toFixed(1)}%
				</div>
				<div style={{ flex: 1 }}>
					<Split direction="horizontal" initialSize={50} onResize={setSize}>
						{[
							<PaneContent key="left" title="Left Pane" />,
							<PaneContent key="right" title="Right Pane" />
						]}
					</Split>
				</div>
			</div>
		)
	}
}

export const CodeEditor: Story = {
	render: () => (
		<div style={{ height: '600px' }}>
			<Split direction="horizontal" initialSize={60}>
				{[
					<div
						key="editor"
						style={{
							padding: '1.5rem',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem'
						}}
					>
						<h3 style={{ color: '#c7d2fe', margin: 0 }}>Code Editor</h3>
						<div
							style={{
								flex: 1,
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
								borderRadius: '0.5rem',
								padding: '1rem',
								fontFamily: 'monospace',
								fontSize: '0.875rem',
								color: '#e0e0e0',
								overflow: 'auto'
							}}
						>
							<pre style={{ margin: 0 }}>
								{`function hello() {
  console.log("Hello, World!");
}

const app = {
  init: function() {
    this.setupEventListeners();
    this.render();
  }
};

app.init();`}
							</pre>
						</div>
					</div>,
					<div
						key="preview"
						style={{
							padding: '1.5rem',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem'
						}}
					>
						<h3 style={{ color: '#c7d2fe', margin: 0 }}>Preview</h3>
						<div
							style={{
								flex: 1,
								background: 'rgba(0, 0, 0, 0.3)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
								borderRadius: '0.5rem',
								padding: '2rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#9ca3af'
							}}
						>
							Output preview area
						</div>
					</div>
				]}
			</Split>
		</div>
	)
}

export const NestedSplits: Story = {
	render: () => (
		<div style={{ height: '600px' }}>
			<Split direction="horizontal" initialSize={50}>
				{[
					<PaneContent key="left" title="Left Sidebar" />,
					<Split key="right" direction="vertical" initialSize={60}>
						{[
							<PaneContent key="main" title="Main Content Area" />,
							<PaneContent key="bottom" title="Bottom Panel" />
						]}
					</Split>
				]}
			</Split>
		</div>
	)
}

export const TripleSplit: Story = {
	render: () => (
		<div style={{ height: '600px' }}>
			<Split direction="horizontal" initialSize={33}>
				{[
					<PaneContent key="left" title="Left" />,
					<Split key="right" direction="horizontal" initialSize={50}>
						{[
							<PaneContent key="center" title="Center" />,
							<PaneContent key="right" title="Right" />
						]}
					</Split>
				]}
			</Split>
		</div>
	)
}

export const FileExplorer: Story = {
	render: () => {
		const files = [
			'📁 src',
			'  📁 components',
			'    📄 Button.tsx',
			'    📄 Input.tsx',
			'  📁 styles',
			'    📄 global.css',
			'📄 package.json',
			'📄 README.md'
		]

		return (
			<div style={{ height: '600px' }}>
				<Split direction="horizontal" initialSize={25} minSize={200} maxSize={400}>
					{[
						<div
							key="explorer"
							style={{
								padding: '1.5rem',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem'
							}}
						>
							<h3 style={{ color: '#c7d2fe', margin: 0, fontSize: '1rem' }}>
								Explorer
							</h3>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
								{files.map((file, i) => (
									<div
										key={i}
										style={{
											padding: '0.375rem 0.5rem',
											color: '#9ca3af',
											fontSize: '0.875rem',
											borderRadius: '0.25rem',
											cursor: 'pointer',
											transition: 'all 0.2s'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
											e.currentTarget.style.color = '#c7d2fe'
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = 'transparent'
											e.currentTarget.style.color = '#9ca3af'
										}}
									>
										{file}
									</div>
								))}
							</div>
						</div>,
						<Split key="main" direction="vertical" initialSize={70}>
							{[
								<div
									key="editor"
									style={{
										padding: '1.5rem',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem'
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											paddingBottom: '0.75rem',
											borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
										}}
									>
										<span style={{ color: '#c7d2fe', fontSize: '0.875rem' }}>
											Button.tsx
										</span>
									</div>
									<div
										style={{
											flex: 1,
											background: 'rgba(0, 0, 0, 0.3)',
											border: '1px solid rgba(255, 255, 255, 0.1)',
											borderRadius: '0.5rem',
											padding: '1rem',
											fontFamily: 'monospace',
											fontSize: '0.875rem',
											color: '#e0e0e0',
											overflow: 'auto'
										}}
									>
										<pre style={{ margin: 0 }}>
											{`import React from 'react';

export const Button = ({ children }) => {
  return (
    <button className="btn">
      {children}
    </button>
  );
};`}
										</pre>
									</div>
								</div>,
								<div
									key="terminal"
									style={{
										padding: '1.5rem',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem'
									}}
								>
									<h3 style={{ color: '#c7d2fe', margin: 0, fontSize: '1rem' }}>
										Terminal
									</h3>
									<div
										style={{
											flex: 1,
											background: 'rgba(0, 0, 0, 0.5)',
											border: '1px solid rgba(255, 255, 255, 0.1)',
											borderRadius: '0.5rem',
											padding: '1rem',
											fontFamily: 'monospace',
											fontSize: '0.875rem',
											color: '#86efac',
											overflow: 'auto'
										}}
									>
										<div>$ npm run dev</div>
										<div style={{ marginTop: '0.5rem', color: '#9ca3af' }}>
											Server running on http://localhost:3000
										</div>
									</div>
								</div>
							]}
						</Split>
					]}
				</Split>
			</div>
		)
	}
}

export const MailClient: Story = {
	render: () => {
		const emails = [
			{ subject: 'Welcome to our platform', from: 'team@example.com', preview: 'Thanks for signing up...' },
			{ subject: 'Your weekly report', from: 'reports@example.com', preview: 'Here are your stats...' },
			{ subject: 'New message from John', from: 'john@example.com', preview: 'Hey, can we schedule...' }
		]

		return (
			<div style={{ height: '600px' }}>
				<Split direction="horizontal" initialSize={30} minSize={250}>
					{[
						<div
							key="folders"
							style={{
								padding: '1.5rem',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem'
							}}
						>
							<h3 style={{ color: '#c7d2fe', margin: 0, fontSize: '1rem' }}>Folders</h3>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
								{['📥 Inbox (3)', '📤 Sent', '📝 Drafts', '🗑️ Trash'].map((folder, i) => (
									<div
										key={i}
										style={{
											padding: '0.5rem 0.75rem',
											color: '#9ca3af',
											fontSize: '0.875rem',
											borderRadius: '0.375rem',
											cursor: 'pointer',
											background: i === 0 ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
										}}
									>
										{folder}
									</div>
								))}
							</div>
						</div>,
						<Split key="content" direction="horizontal" initialSize={40}>
							{[
								<div
									key="list"
									style={{
										padding: '1.5rem',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem'
									}}
								>
									<h3 style={{ color: '#c7d2fe', margin: 0, fontSize: '1rem' }}>
										Messages
									</h3>
									<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
										{emails.map((email, i) => (
											<div
												key={i}
												style={{
													padding: '1rem',
													background: i === 0 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
													border: '1px solid rgba(255, 255, 255, 0.1)',
													borderRadius: '0.5rem',
													cursor: 'pointer'
												}}
											>
												<div style={{ color: '#c7d2fe', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
													{email.subject}
												</div>
												<div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
													{email.from}
												</div>
												<div style={{ color: '#6b7280', fontSize: '0.75rem' }}>
													{email.preview}
												</div>
											</div>
										))}
									</div>
								</div>,
								<div
									key="detail"
									style={{
										padding: '1.5rem',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem'
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '0.5rem',
											paddingBottom: '1rem',
											borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
										}}
									>
										<h3 style={{ color: '#c7d2fe', margin: 0, fontSize: '1.125rem' }}>
											Welcome to our platform
										</h3>
										<div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
											From: team@example.com
										</div>
									</div>
									<div style={{ flex: 1, color: '#e0e0e0', fontSize: '0.875rem', lineHeight: 1.6 }}>
										<p>Hi there,</p>
										<p>Thanks for signing up! We're excited to have you on board.</p>
										<p>
											If you have any questions, feel free to reach out to our support team.
										</p>
										<p>Best regards,<br />The Team</p>
									</div>
								</div>
							]}
						</Split>
					]}
				</Split>
			</div>
		)
	}
}

export const ResponsiveLayout: Story = {
	render: () => (
		<div style={{ height: '600px' }}>
			<Split
				direction="horizontal"
				initialSize={25}
				minSize={200}
				snapPositions={[20, 25, 30]}
			>
				{[
					<PaneContent
						key="sidebar"
						title="Sidebar"
						content="Resize me! This layout snaps to 20%, 25%, and 30% for consistent sizing."
					/>,
					<PaneContent key="main" title="Main Content" />
				]}
			</Split>
		</div>
	)
}
