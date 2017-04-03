import React from 'react';
import { insertScript, removeScript, debounce } from './utils';

const queueResetCount = debounce(() => {
    if (window.DISQUSWIDGETS)
        window.DISQUSWIDGETS.getCount({ reset: true });
}, 300, false); // eslint-disable-line no-magic-numbers

const DOC = window.document;

export class DisqusThread extends React.Component {
    componentWillMount() {
        if (window.disqus_shortname && window.disqus_shortname !== this.props.shortname)
            this.cleanInstance();
    }

    componentDidMount() {
        this.reset();
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
        this.reset();
    }

    reset() {
        if (DOC.getElementById('dsq-embed-scr')) {
            window.DISQUS.reset({
                reload: true,
                config: this.getDisqusConfig(this.props.config),
            });
        } else {
            window.disqus_config = this.getDisqusConfig(this.props.config);
            window.disqus_shortname = this.props.shortname;
            insertScript(`https://${this.props.shortname}.disqus.com/embed.js`, 'dsq-embed-scr', DOC.body);
        }
    }

    getDisqusConfig(config) {
        return function () {
            this.page.identifier = config.identifier;
            this.page.url = config.url;
            this.page.title = config.title;
            this.callbacks.onNewComment = [
                config.onNewComment,
            ];
        };
    }

    cleanInstance() {
        removeScript('dsq-embed-scr', DOC.body);
        window.DISQUS = undefined;
        const disqusThread = DOC.getElementById('disqus_thread');
        if (disqusThread) {
            while (disqusThread.hasChildNodes())
                disqusThread.removeChild(disqusThread.firstChild);
        }
    }

    render() {
        return (
            <div id="disqus_thread"></div>
        );
    }
}

DisqusThread.propTypes = {
    shortname: React.PropTypes.string.isRequired,
    config: React.PropTypes.shape({
        identifier: React.PropTypes.string,
        url: React.PropTypes.string,
        title: React.PropTypes.string,

        onNewComment: React.PropTypes.func,
    }).isRequired,
};

export class DisqusCommentCount extends React.Component {
    componentDidMount() {
        this.reset();
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
        this.reset();
    }

    reset() {
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

DisqusCommentCount.propTypes = {
    shortname: React.PropTypes.string.isRequired,
    config: React.PropTypes.shape({
        identifier: React.PropTypes.string,
        url: React.PropTypes.string,
    }).isRequired,
    children: React.PropTypes.node,
};
