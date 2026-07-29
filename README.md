# composer-ui

A polished, accessible **chat / prompt composer** React component — context pill,
auto-growing input, attach, Research toggle, source & model selectors, mic, and
send button. Ships as a library and is documented in Storybook.

## Develop

```bash
npm install
npm run storybook   # http://localhost:6006
```

## Build the library

```bash
npm run build           # -> dist/ (ESM + CJS + .d.ts + CSS)
npm run build-storybook # -> storybook-static/ (deployable docs site)
```

## Usage

```tsx
import { PromptComposer } from "composer-ui";
import "composer-ui/styles.css";

export function App() {
  return (
    <PromptComposer
      placeholder="Learn something new..."
      onSend={(text) => console.log("send:", text)}
      onClose={() => console.log("close")}
      models={["Claude Opus 4.8", "GPT-5"]}
      sources={[
        { id: "all", label: "All sources" },
        { id: "web", label: "Web" },
      ]}
    />
  );
}
```

### Key props

| Prop | Type | Notes |
| --- | --- | --- |
| `value` / `defaultValue` | `string` | Controlled / uncontrolled input |
| `onSend` | `(value: string) => void` | Fires on send button or Enter |
| `onChange` | `(value: string) => void` | Per-keystroke |
| `onAttach` | `(files: FileList \| null) => void` | Opens a file picker |
| `research` / `defaultResearch` | `boolean` | Research toggle state |
| `onResearchToggle` | `(active: boolean) => void` | |
| `sources` | `{ id: string; label: string }[]` | Source dropdown |
| `models` | `string[]` | Model dropdown |
| `onClose` | `() => void` | Shows the ✕ button when provided |
| `disabled` | `boolean` | Disables everything |

`Enter` sends, `Shift+Enter` inserts a newline. Styling is themeable via CSS
custom properties (see `--pc-*` in `PromptComposer.module.css`) and adapts to
`prefers-color-scheme: dark`.
