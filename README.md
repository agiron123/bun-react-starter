# bun-react-tailwind-shadcn-template

A modern React starter template with Bun, Tailwind CSS v4, shadcn/ui components, and Storybook.

## Tech Stack

- **React 19** - Latest React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components built with Radix UI
- **Bun** - Fast JavaScript runtime and package manager
- **Storybook** - UI component development environment
- **Vitest** - Fast unit testing framework

## Installation

To install dependencies:

```bash
bun install
# or
npm install
```

## Development

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Storybook

This project includes Storybook for component development and documentation.

### Running Storybook

Start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006/`

### Building Storybook

Build a static version of Storybook:

```bash
npm run build-storybook
```

The static files will be generated in the `storybook-static` directory.

### Component Stories

Stories for shadcn/ui components are located in `src/components/ui/*.stories.tsx`. To add a new story:

1. Create a `.stories.tsx` file next to your component
2. Import the component and Story types
3. Define your stories with different variants and states

Example:

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MyComponent } from "./my-component";

const meta = {
  title: "UI/MyComponent",
  component: MyComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your props here
  },
};
```

## Testing

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with UI:

```bash
npm run test:ui
```

## Linting & Formatting

Lint code:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

Format code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Building

Build the project:

```bash
npm run build
```

---

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
