import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { fn } from "@storybook/test";
import { PromptComposer } from "./PromptComposer";

const meta = {
  title: "Components/PromptComposer",
  component: PromptComposer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A polished chat/prompt composer: context pill, auto-growing input, attach, Research toggle, source & model selectors, mic, and send. Fully controllable or uncontrolled.",
      },
    },
  },
  args: {
    placeholder: "Learn something new...",
    onSend: fn(),
    onChange: fn(),
    onAttach: fn(),
    onClose: fn(),
    onMic: fn(),
    onAddContext: fn(),
    onSourceChange: fn(),
    onModelChange: fn(),
    onResearchToggle: fn(),
  },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    maxRows: { control: { type: "number", min: 1, max: 20 } },
  },
} satisfies Meta<typeof PromptComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches the reference design: closable card with all controls. */
export const Default: Story = {};

/** Without the close button. */
export const NoCloseButton: Story = {
  args: { onClose: undefined },
};

/** Pre-filled so the send button is active. */
export const WithText: Story = {
  args: {
    defaultValue: "Explain how transformer attention works",
    onClose: undefined,
  },
};

/** Research mode enabled by default. */
export const ResearchOn: Story = {
  args: { defaultResearch: true, onClose: undefined },
};

/** Custom sources and model options. */
export const CustomOptions: Story = {
  args: {
    onClose: undefined,
    contextLabel: "Add sources",
    sources: [
      { id: "all", label: "All sources" },
      { id: "docs", label: "My docs" },
      { id: "web", label: "Web" },
      { id: "gh", label: "GitHub" },
    ],
    models: ["Claude Opus 4.8", "Claude Sonnet 5", "GPT-5", "Llama 4"],
    defaultModel: "Claude Opus 4.8",
  },
};

/** Disabled state. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Sending…", onClose: undefined },
};

/** Fully controlled — value and events managed by the parent. */
export const Controlled: Story = {
  args: { onClose: undefined },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [log, setLog] = useState<string[]>([]);
    return (
      <div style={{ display: "grid", gap: 16, width: 480 }}>
        <PromptComposer
          {...args}
          value={value}
          onChange={setValue}
          onSend={(v) => {
            setLog((l) => [`sent: ${v}`, ...l].slice(0, 5));
            setValue("");
          }}
        />
        <div style={{ fontFamily: "monospace", fontSize: 13, color: "#71717a" }}>
          {log.length === 0 ? "Type and press Enter…" : log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    );
  },
};
