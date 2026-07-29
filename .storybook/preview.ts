import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "peach",
      values: [
        { name: "peach", value: "linear-gradient(135deg, #fdf2ee 0%, #f7e9ff 100%)" },
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#f4f4f5" },
        { name: "dark", value: "#18181b" },
      ],
    },
    layout: "centered",
  },
};

export default preview;
