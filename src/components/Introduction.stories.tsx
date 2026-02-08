import type { Meta } from "@storybook/react-vite";

const meta = {
  title: "Introduction",
  parameters: {
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
  },
} satisfies Meta;

export default meta;

export const Welcome = {
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Welcome to bun-react-starter Storybook
      </h1>
      
      <p style={{ fontSize: "1.125rem", marginBottom: "2rem", color: "#666" }}>
        This Storybook showcases the UI components from this project, which uses:
      </p>

      <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "2rem" }}>
        <li style={{ marginBottom: "0.5rem" }}>
          <strong>React 19</strong> - Latest React framework
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <strong>Tailwind CSS v4</strong> - Utility-first CSS framework
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <strong>shadcn/ui</strong> - Beautiful, accessible components built with Radix UI
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <strong>TypeScript</strong> - Type-safe development
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <strong>Bun</strong> - Fast JavaScript runtime and package manager
        </li>
      </ul>

      <h2 style={{ fontSize: "1.875rem", marginTop: "2rem", marginBottom: "1rem", fontWeight: "600" }}>
        What's in this Storybook?
      </h2>

      <p style={{ marginBottom: "1rem" }}>
        Browse through the <strong>UI</strong> category in the sidebar to see all available shadcn/ui components with:
      </p>

      <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "2rem" }}>
        <li>Live interactive examples</li>
        <li>Component props and variants</li>
        <li>Accessibility features</li>
        <li>Code snippets</li>
      </ul>

      <h2 style={{ fontSize: "1.875rem", marginTop: "2rem", marginBottom: "1rem", fontWeight: "600" }}>
        Component Categories
      </h2>

      <h3 style={{ fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "0.75rem", fontWeight: "600" }}>
        UI Components
      </h3>

      <p style={{ marginBottom: "1rem" }}>
        All shadcn/ui components are available under the <strong>UI/</strong> category, including:
      </p>

      <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "2rem" }}>
        <li>Button, Badge, Card</li>
        <li>Input, Textarea, Select</li>
        <li>Dialog, Sheet, Popover</li>
        <li>Accordion, Tabs, Collapsible</li>
        <li>And many more...</li>
      </ul>

      <h2 style={{ fontSize: "1.875rem", marginTop: "2rem", marginBottom: "1rem", fontWeight: "600" }}>
        Getting Started
      </h2>

      <p style={{ marginBottom: "1rem" }}>
        To add a new story for a component:
      </p>

      <ol style={{ listStyleType: "decimal", paddingLeft: "2rem", marginBottom: "2rem" }}>
        <li>Create a <code>.stories.tsx</code> file next to your component</li>
        <li>Import the component and Meta/StoryObj types</li>
        <li>Define your stories with different variants and states</li>
      </ol>

      <h2 style={{ fontSize: "1.875rem", marginTop: "2rem", marginBottom: "1rem", fontWeight: "600" }}>
        Running Storybook
      </h2>

      <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "2rem" }}>
        <li>Development: <code>npm run storybook</code></li>
        <li>Build: <code>npm run build-storybook</code></li>
      </ul>

      <h2 style={{ fontSize: "1.875rem", marginTop: "2rem", marginBottom: "1rem", fontWeight: "600" }}>
        Learn More
      </h2>

      <ul style={{ listStyleType: "disc", paddingLeft: "2rem" }}>
        <li>
          <a href="https://storybook.js.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#0066CC" }}>
            Storybook Documentation
          </a>
        </li>
        <li>
          <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#0066CC" }}>
            shadcn/ui Documentation
          </a>
        </li>
        <li>
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#0066CC" }}>
            Tailwind CSS Documentation
          </a>
        </li>
      </ul>
    </div>
  ),
};
