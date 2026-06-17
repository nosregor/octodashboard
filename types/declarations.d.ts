declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '@primer/octicons-react' {
  import type React from 'react';

  type OcticonDef = unknown;

  interface OcticonProps {
    icon: OcticonDef;
    size?: 'small' | 'medium' | 'large' | number;
    className?: string;
    ariaLabel?: string;
  }

  const Octicon: React.FC<OcticonProps>;
  export default Octicon;

  export const MarkGithub: OcticonDef;
  export const Briefcase: OcticonDef;
  export const Calendar: OcticonDef;
  export const Location: OcticonDef;
  export const Repo: OcticonDef;
  export const Star: OcticonDef;
  export const RepoForked: OcticonDef;
  export const TriangleDown: OcticonDef;
}

declare module 'gh-polyglot' {
  import type { LangStat } from './github';

  export default class GhPolyglot {
    constructor(username: string);
    userStats(callback: (err: Error | null, stats: LangStat[]) => void): void;
  }
}
