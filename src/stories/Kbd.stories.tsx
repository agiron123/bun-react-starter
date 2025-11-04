import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "@/components/ui/kbd";

const meta = {
  title: "UI/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
};

export const ModifierKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Del</Kbd>
    </div>
  ),
};

export const ShortcutExample: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Quick search:</span>
      <div className="flex gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
    </div>
  ),
};
