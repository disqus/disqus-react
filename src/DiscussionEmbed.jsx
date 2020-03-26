import React from 'react';
import PropTypes from 'prop-types';
import { insertScript, removeScript, shallowComparison } from './utils';

const callbacks = [
    'preData',
    'preInit',
    'onInit',
    'onReady',
    'afterRender',
    'preReset',
    'onIdentify',
    'beforeComment',
    'onNewComment',
    'onPaginate',
];

export class DiscussionEmbed extends React.Component {

    componentDidMount() {
        if (typeof window !== 'undefined' && window.disqus_shortname &&
            window.disqus_shortname !== this.props.shortname)
            this.cleanInstance();
        this.loadInstance();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps)
            return false;
        return shallowComparison(this.props, nextProps);
    }

    componentDidUpdate(nextProps) {
        if (this.props.shortname !== nextProps.shortname)
            this.cleanInstance();
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
            this.page.remote_auth_s3 = config.remoteAuthS3;
            this.page.api_key = config.apiKey;

            callbacks.forEach(callbackName => {
                this.callbacks[callbackName] = [
                    config[callbackName],
                ];
            });
        };
    }

    render() {
        return (
            <div id="disqus_thread"></div>
        );
    }
}

DiscussionEmbed.propTypes = {
    shortname: PropTypes.string.isRequired,
    config: PropTypes.shape({
        identifier: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
        preData: PropTypes.func,
        preInit: PropTypes.func,
        onInit: PropTypes.func,
        onReady: PropTypes.func,
        afterRender: PropTypes.func,
        preReset: PropTypes.func,
        onIdentify: PropTypes.func,
        beforeComment: PropTypes.func,
        onNewComment: PropTypes.func,
        onPaginate: PropTypes.func,
    }).isRequired,
};
