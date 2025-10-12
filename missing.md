# Missing Components

This document lists components that would be valuable additions to the @clarlabs/ui library.

## Current Components (42)

Accordion, Alert, Avatar, Badge, Breadcrumbs, Button, ButtonGroup, Card, Checkbox, Combobox, Datagrid, DatePicker, DateRangePicker, Divider, Dropdown, FilePicker, Header, Icon, Input, Label, List, Modal, Pagination, ProgressBar, RadioButton, RangeInput, RichSelect, Select, SidePanel, Signpost, Spinner, StackView, Stepper, Table, Tabs, Textarea, Timeline, Toast, ToggleSwitch, Tooltip, TreeView, VerticalNav

---

## High Priority Components

### Layout & Structure

-   [ ] **Flex** - Flexible box layout component with props for common patterns

### Navigation

-   [ ] **Menu** - Context menu and dropdown menu
-   [ ] **MenuBar** - Application menu bar
-   [ ] **CommandPalette** - Quick command/search interface
-   [ ] **Drawer** - Slide-out navigation panel (similar to SidePanel but more flexible)

### Data Display

-   [ ] **Chip** - Small labeled UI element (similar to Badge but interactive)
-   [ ] **EmptyState** - Placeholder for empty data states
-   [ ] **Code** - Syntax-highlighted code block
-   [ ] **Kbd** - Keyboard shortcut display

### Feedback

-   [ ] **Notification** - System notification component
-   [ ] **Banner** - Prominent message bar (different from Alert)
-   [ ] **Popover** - Floating content container
-   [ ] **Dialog** - Confirmation/prompt dialog (lighter than Modal)

### Forms

-   [ ] **Form** - Form wrapper with validation
-   [ ] **FormField** - Consistent form field wrapper
-   [ ] **SearchInput** - Input with search functionality
-   [ ] **NumberInput** - Input specifically for numbers with increment/decrement
-   [ ] **Switch** - Alternative toggle switch design
-   [ ] **Slider** - Alternative to RangeInput with more features

### Media

-   [ ] **Image** - Enhanced image with loading states

### Overlay

-   [ ] **Backdrop** - Overlay backdrop component
-   [ ] **Portal** - Render children outside DOM hierarchy
-   [ ] **FocusTrap** - Trap focus within a component

---

## Medium Priority Components

### Advanced Data

-   [ ] **VirtualList** - Virtualized list for large datasets
-   [ ] **InfiniteScroll** - Infinite scroll container
-   [ ] **Kanban** - Kanban board component
-   [ ] **Gantt** - Gantt chart for project timelines
-   [ ] **Chart** - Basic chart components (wrapper for chart library)

### Interactive

-   [ ] **Collapsible** - Expandable/collapsible content
-   [ ] **Disclosure** - Show/hide content toggle
-   [ ] **Resizable** - Resizable panels
-   [ ] **Draggable** - Drag and drop functionality
-   [ ] **Sortable** - Sortable list items

### Specialized

-   [ ] **CommandK** - Command menu (⌘K style)
-   [ ] **Tour** - Guided tour/walkthrough
-   [ ] **HotKeys** - Keyboard shortcut handler
-   [ ] **ColorSwatch** - Color palette display
-   [ ] **QRCode** - QR code generator/display
-   [ ] **Barcode** - Barcode display

---

## Low Priority / Nice-to-Have

### Utility

-   [ ] **VisuallyHidden** - Screen reader only content
-   [ ] **AspectRatio** - Maintain aspect ratio container
-   [ ] **Center** - Center content utility
-   [ ] **Show/Hide** - Conditional rendering utility
-   [ ] **ScrollArea** - Custom scrollbar container

### Specialized UI

-   [ ] **Terminal** - Terminal emulator UI
-   [ ] **JsonViewer** - JSON tree viewer
-   [ ] **MarkdownViewer** - Markdown renderer
-   [ ] **Editor** - Rich text editor
-   [ ] **CodeEditor** - Code editor component

### Data Visualization

-   [ ] **Sparkline** - Inline charts
-   [ ] **TreeMap** - Hierarchical data visualization

### Advanced Forms

-   [ ] **MaskedInput** - Input with format mask
-   [ ] **AutoComplete** - Autocomplete input (may overlap with Combobox)
-   [ ] **MultiSelect** - Multiple selection dropdown
-   [ ] **TransferList** - Move items between lists
-   [ ] **FormWizard** - Multi-step form (may overlap with Stepper)

---

## Implementation Notes

### Priorities Based On:

1. **Frequency of use** in modern web applications
2. **Complexity** - Start with simpler components
3. **Dependencies** - Components that don't require heavy external libraries
4. **Foundation** - Components that other components might depend on

### Recommended Next Steps:

1. Start with layout components (Grid, Container, Flex) - foundational
2. Add missing form components (NumberInput, SearchInput, TagInput) - commonly needed
3. Implement feedback components (Notification, Popover, Dialog) - enhance UX
4. Add data display components (Chip, EmptyState, StatCard) - improve content presentation

### Component Design Guidelines:

-   Follow existing patterns (TypeScript, SCSS modules, Storybook stories)
-   Support light/dark modes using `:global(.light-mode)`
-   Include proper accessibility (ARIA attributes, keyboard navigation)
-   Provide comprehensive Storybook examples
-   Use glassmorphism design aesthetic to match existing components
