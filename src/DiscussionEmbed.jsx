import React from 'react';
import { insertScript, removeScript } from './utils';

export class DiscussionEmbed extends React.Component {
    componentWillMount() {
        if (typeof window !== 'undefined' && window.disqus_shortname && window.disqus_shortname !== this.props.shortname)
            this.cleanInstance();
    }

    componentDidMount() {
        this.loadInstance();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.shortname !== nextProps.shortname)
            return true;

        const nextConfig = nextProps.config;
        const config = this.props.config;
        if (nextConfig.url === config.url && nextConfig.identifier === config.identifier)
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
        const doc = window.document;
        if (window && window.DISQUS && doc.getElementById('dsq-embed-scr')) {
            window.DISQUS.reset({
                reload: true,
                config: this.getDisqusConfig(this.props.config),
            });
        } else {
            window.disqus_config = this.getDisqusConfig(this.props.config);
            window.disqus_shortname = this.props.shortname;
            insertScript(`https://${this.props.shortname}.disqus.com/embed.js`, 'dsq-embed-scr', doc.body);
        }
    }

    cleanInstance() {
        const doc = window.document;
        removeScript('dsq-embed-scr', doc.body);
        if (window && window.DISQUS)
            window.DISQUS.reset({});

        try {
            delete window.DISQUS;
        } catch (error) {
            window.DISQUS = undefined;
        }
        const disqusThread = doc.getElementById('disqus_thread');
        if (disqusThread) {
            while (disqusThread.hasChildNodes())
                disqusThread.removeChild(disqusThread.firstChild);
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

    render() {
        return (
            <div id="disqus_thread"></div>
        );
    }
}
