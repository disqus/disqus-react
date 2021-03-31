import React from 'react';
import PropTypes from 'prop-types';
// Constants
import {
    COMMENT_EMBED_WIDTH,
    COMMENT_EMBED_HEIGHT,
} from './constants';


export class CommentEmbed extends React.Component {
    getSrc() {
        const radixBase = 36;
        const post = Number(this.props.commentId).toString(radixBase);
        const parentParam = this.props.showParentComment ? '1' : '0';
        const mediaParam = this.props.showMedia ? '1' : '0';

        return `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { width, height, commentId, showMedia, showParentComment, ...rest } = this.props;
        return (
            <iframe
                {...rest}
                src={this.getSrc()}
                width={width}
                height={height}
                seamless='seamless'
                scrolling='no'
                frameBorder='0'
            />
        );
    }
}

CommentEmbed.defaultProps = {
    showMedia: true,
    showParentComment: true,
    width: COMMENT_EMBED_WIDTH,
    height: COMMENT_EMBED_HEIGHT,
};

CommentEmbed.propTypes = {
    commentId: PropTypes.string.isRequired,
    showMedia: PropTypes.bool,
    showParentComment: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};
