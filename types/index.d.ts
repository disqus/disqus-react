import * as React from "react";

interface DisqusProps {
  shortname: string;
  config: {
    url: string;
    identifier: string;
    title: string;
  };
}

interface CommentCountProps extends DisqusProps {
  children?: React.ReactNode;
}

interface CommentEmbedProps {
  commentId: string;
  showParentComment?: boolean;
  showMedia?: boolean;
  width?: number;
  height?: number;
}

interface IDisqus {
  CommentCount: React.Component<CommentCountProps, {}>;
  CommentEmbed: React.Component<CommentEmbedProps, {}>;
  DiscussionEmbed: React.Component<DisqusProps, {}>;
}

declare class CommentCount extends React.Component<CommentCountProps, {}> {}
declare class CommentEmbed extends React.Component<CommentEmbedProps, {}> {}
declare class DiscussionEmbed extends React.Component<DisqusProps, {}> {}
declare const Disqus: {
  CommentCount: React.ComponentType<CommentCountProps>;
  CommentEmbed: React.ComponentType<CommentEmbedProps>;
  DiscussionEmbed: React.ComponentType<DisqusProps>;
};

export { CommentCount, CommentEmbed, DiscussionEmbed };
export default Disqus;
