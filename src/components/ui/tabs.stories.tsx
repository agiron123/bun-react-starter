import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithMultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-2">
        <h3 className="text-sm font-medium">Overview</h3>
        <p className="text-sm text-muted-foreground">
          View a summary of your account activity.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-2">
        <h3 className="text-sm font-medium">Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Detailed analytics and insights about your data.
        </p>
      </TabsContent>
      <TabsContent value="reports" className="space-y-2">
        <h3 className="text-sm font-medium">Reports</h3>
        <p className="text-sm text-muted-foreground">
          Generate and download various reports.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
