import * as React from 'react';

interface DisqusConfig {
  url?: string;
  identifier?: string;
  title?: string;
}

interface DiscussionEmbedConfig extends DisqusConfig {
  categoryID?: string;
  language?: string;
  apiKey?: string;
  sso?: {
    name?: string;
    button?: string;
    icon?: string;
    url?: string;
    logout?: string;
    profile_url?: string;
    width?: string;
    height?: string;
  };
  // Callbacks
  preData?: (...args: any[]) => any;
  preInit?: (...args: any[]) => any;
  onInit?: (...args: any[]) => any;
  onReady?: (...args: any[]) => any;
  afterRender?: (...args: any[]) => any;
  preReset?: (...args: any[]) => any;
  onIdentify?: (...args: any[]) => any;
  beforeComment?: (...args: any[]) => any;
  onNewComment?: (...args: any[]) => any;
  onPaginate?: (...args: any[]) => any;
}

interface DiscussionEmbedProps {
  shortname: string;
  config: DiscussionEmbedConfig;
}

interface CommentCountProps extends DiscussionEmbedProps {
  shortname: string;
  config: DisqusConfig;
  children?: React.ReactNode;
}

interface CommentEmbedProps {
  commentId: string;
  showParentComment?: boolean;
  showMedia?: boolean;
  width?: number;
  height?: number;
}

interface RecommendationsProps {
  shortname: string;
  config: DisqusConfig;
}

declare class CommentCount extends React.Component<CommentCountProps, {}> {}
declare class CommentEmbed extends React.Component<CommentEmbedProps, {}> {}
declare class DiscussionEmbed extends React.Component<DiscussionEmbedProps, {}> {}
declare class Recommendations extends React.Component<RecommendationsProps, {}> {}

declare const Disqus: {
  CommentCount: React.ComponentType<CommentCountProps>;
  CommentEmbed: React.ComponentType<CommentEmbedProps>;
  DiscussionEmbed: React.ComponentType<DiscussionEmbedProps>;
  Recommendations: React.Component<RecommendationsProps, {}>;
}

export { CommentCount, CommentEmbed, DiscussionEmbed, Recommendations };
export default Disqus;
