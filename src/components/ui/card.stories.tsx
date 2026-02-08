import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <h3 className="text-lg font-semibold mb-2">Card Title</h3>
      <p className="text-sm text-muted-foreground">
        This is a card component from shadcn/ui, styled with Tailwind CSS.
      </p>
    </Card>
  ),
};

export const WithMultipleSections: Story = {
  render: () => (
    <Card className="w-[350px]">
      <div className="p-6 pb-3">
        <h3 className="text-lg font-semibold">Card Header</h3>
        <p className="text-sm text-muted-foreground">Card Description</p>
      </div>
      <div className="p-6 pt-0">
        <p className="text-sm">This is the card content area.</p>
      </div>
      <div className="p-6 pt-0 border-t">
        <p className="text-sm text-muted-foreground">Card Footer</p>
      </div>
    </Card>
  ),
};
