import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Storybook?</AccordionTrigger>
        <AccordionContent>
          Storybook is a frontend workshop for building UI components and pages in isolation.
          It helps you develop and share hard-to-reach states and edge cases without running your app.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
        <AccordionContent>
          shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS.
          Components are not packaged as a dependency but are copied into your project for full customization.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
          It provides low-level utility classes that let you build completely custom designs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          This accordion allows multiple items to be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          Try opening multiple items simultaneously!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          All items can be open at the same time with type="multiple".
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
