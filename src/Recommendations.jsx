import React from 'react';
import PropTypes from 'prop-types';
import {
    insertScript,
    removeScript,
    shallowComparison,
    removeResources,
} from './utils';
// Constants
import {
    RECOMMENDATIONS_ID,
    RECOMMENDATIONS_SCRIPT_ID,
} from './constants';


export class Recommendations extends React.Component {

    componentDidMount() {
        this.loadInstance();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps)
            return false;
        return shallowComparison(this.props, nextProps);
    }

    componentDidUpdate() {
        this.loadInstance();
    }

    componentWillUnmount() {
        this.cleanInstance();
    }

    getDisqusConfig(config) {
        return function () {
            this.page.identifier = config.identifier;
            this.page.url = config.url;
            this.page.title = config.title;
            this.language = config.language;
        };
    }

    loadInstance() {
        if (typeof window !== 'undefined' && window.document) {
            window.disqus_config = this.getDisqusConfig(this.props.config);
            if (window.document.getElementById(RECOMMENDATIONS_SCRIPT_ID)) {
                this.reloadInstance();
            } else {
                insertScript(
                    `https://${this.props.shortname}.disqus.com/recommendations.js`,
                    RECOMMENDATIONS_SCRIPT_ID,
                    window.document.body
                );
            }
        }
    }

    reloadInstance() {
        if (window && window.DISQUS_RECOMMENDATIONS) {
            window.DISQUS_RECOMMENDATIONS.reset({
                reload: true,
            });
        }
    }

    cleanInstance() {
        removeScript(RECOMMENDATIONS_SCRIPT_ID, window.document.body);
        try {
            delete window.DISQUS_RECOMMENDATIONS;
        } catch (error) {
            window.DISQUS_RECOMMENDATIONS = undefined;
        }
        const recommendations = window.document.getElementById(RECOMMENDATIONS_ID);
        if (recommendations) {
            while (recommendations.hasChildNodes())
                recommendations.removeChild(recommendations.firstChild);
        }
        removeResources();
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { shortname, config, ...rest } = this.props;
        return (
            <div {...rest} id={RECOMMENDATIONS_ID} />
        );
    }
}

Recommendations.propTypes = {
    shortname: PropTypes.string.isRequired,
    config: PropTypes.shape({
        identifier: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
        language: PropTypes.string,
    }),
};
