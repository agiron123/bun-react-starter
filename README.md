# bun-react-tailwind-shadcn-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Storybook

This project includes Storybook for developing and showcasing UI components in isolation.

To start Storybook:

```bash
npm run storybook
```

To build Storybook:

```bash
npm run build-storybook
```

The Storybook includes stories for all the shadcn/ui components used in the kitchen sink, including:
- Layout & Structure: Card, Separator, AspectRatio, ScrollArea, Skeleton
- Navigation: Breadcrumb, Tabs
- Forms: Input, Label, Textarea, Select, InputOTP, Checkbox, RadioGroup, Switch, Slider, Calendar
- Buttons & Actions: Button, Toggle, ToggleGroup
- Feedback & Overlays: Alert, Dialog, Drawer, Sheet, Popover, Tooltip, HoverCard, ContextMenu, Command, DropdownMenu
- Data Display: Table, Badge, Avatar, Progress, Kbd, Empty
- Interactive: Accordion, Collapsible

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
