import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-[400px] space-y-2">
        <Label>Volume: {value[0]}</Label>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80]);
    return (
      <div className="w-[400px] space-y-2">
        <Label>
          Range: {value[0]} - {value[1]}
        </Label>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};
