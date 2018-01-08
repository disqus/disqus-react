import React from 'react';

const RADIX_BASE = 36;

export class CommentEmbed extends React.Component {
    getSrc() {
        const post = Number(this.props.commentId).toString(RADIX_BASE);
        const parentParam = this.props.showParentComment ? '1' : '0';
        const mediaParam = this.props.showMedia ? '1' : '0';

        return `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;
    }

    render() {
        return (
            <iframe
                src={this.getSrc()}
                width={this.props.width}
                height={this.props.height}
                seamless="seamless"
                scrolling="no"
                frameBorder="0"
            />
        );
    }
}

CommentEmbed.defaultProps = {
    showMedia: true,
    showParentComment: true,
    width: 420,
    height: 320,
};
