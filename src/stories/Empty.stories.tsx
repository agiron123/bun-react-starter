import type { Meta, StoryObj } from "@storybook/react";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyTitle>No items found</EmptyTitle>
      <EmptyDescription>Get started by creating a new item.</EmptyDescription>
    </Empty>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any projects yet. Start by creating your first project.
      </EmptyDescription>
      <Button className="mt-4">Create Project</Button>
    </Empty>
  ),
};
