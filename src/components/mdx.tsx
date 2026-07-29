import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { ComposerDemo } from '@/components/composer-demo';
import { Preview } from '@/components/preview';
import { PromptComposer } from '@/components/ui/prompt-composer';
import { AIButton } from '@/components/ui/ai-button';
import { Caveat } from '@/components/ui/caveat';
import { Parameters } from '@/components/ui/parameters';
import { ResponseActions } from '@/components/ui/response-actions';
import { InlineAction } from '@/components/ui/inline-action';
import { FollowUp } from '@/components/ui/follow-up';
import { AttachmentComposer } from '@/components/ui/attachment-composer';
import { PrivateComposer } from '@/components/ui/private-composer';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    // Live component demos available in any MDX file.
    ComposerDemo,
    Preview,
    PromptComposer,
    AIButton,
    Caveat,
    Parameters,
    ResponseActions,
    InlineAction,
    FollowUp,
    AttachmentComposer,
    PrivateComposer,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
