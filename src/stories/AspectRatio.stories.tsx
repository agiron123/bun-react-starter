import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const meta = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SixteenByNine: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
        <div className="flex items-center justify-center h-full">16:9</div>
      </AspectRatio>
    </div>
  ),
};

export const FourByThree: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={4 / 3} className="bg-muted rounded-md overflow-hidden">
        <div className="flex items-center justify-center h-full">4:3</div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
        <div className="flex items-center justify-center h-full">1:1</div>
      </AspectRatio>
    </div>
  ),
};
