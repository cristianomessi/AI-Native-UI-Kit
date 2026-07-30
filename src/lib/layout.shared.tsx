import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Coffee } from 'lucide-react';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: 'button',
        text: 'Buy me a coffee',
        icon: <Coffee />,
        url: 'https://buymeacoffee.com/balram93',
        external: true,
      },
    ],
  };
}
