import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { ComposerDemo } from '@/components/composer-demo';
import { Preview } from '@/components/preview';
import { PromptComposer } from '@/components/ui/prompt-composer';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    // Live component demos available in any MDX file.
    ComposerDemo,
    Preview,
    PromptComposer,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
