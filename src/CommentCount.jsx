import React from 'react';
import { insertScript, removeScript, debounce } from './utils';

const queueResetCount = debounce(() => {
    if (window.DISQUSWIDGETS)
        window.DISQUSWIDGETS.getCount({ reset: true });
}, 300, false); // eslint-disable-line no-magic-numbers

const DOC = window.document;

export class CommentCount extends React.Component {
    componentDidMount() {
        this.loadInstance();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.shortname !== nextProps.shortname)
            return true;

        const nextConfig = nextProps.config;
        const config = this.props.config;
        if (nextConfig.url === config.url || nextConfig.identifier === config.identifier)
            return false;
        return true;
    }

    componentWillUpdate(nextProps) {
        if (this.props.shortname !== nextProps.shortname)
            this.cleanInstance();
    }

    componentDidUpdate() {
        this.loadInstance();
    }

    loadInstance() {
        if (DOC.getElementById('dsq-count-scr'))
            queueResetCount();
        else
            insertScript(`https://${this.props.shortname}.disqus.com/count.js`, 'dsq-count-scr', DOC.body);
    }

    cleanInstance() {
        removeScript('dsq-count-scr', DOC.body);

        // count.js only reassigns this window object if it's undefined.
        window.DISQUSWIDGETS = undefined;
    }

    render() {
        return (
            <span
                className="disqus-comment-count"
                data-disqus-identifier={this.props.config.identifier}
                data-disqus-url={this.props.config.url}
            >
                {this.props.children}
            </span>
        );
    }
}

CommentCount.propTypes = {
    shortname: React.PropTypes.string.isRequired,
    config: React.PropTypes.shape({
        identifier: React.PropTypes.string,
        url: React.PropTypes.string,
    }).isRequired,
    children: React.PropTypes.node,
};
