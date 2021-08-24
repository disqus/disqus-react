import React from 'react';
import PropTypes from 'prop-types';
import {
    insertScript,
    removeScript,
    debounce,
    shallowComparison,
    removeResources,
} from './utils';
// Constants
import {
    COMMENT_COUNT_CLASS,
    COMMENT_COUNT_SCRIPT_ID,
} from './constants';


const queueResetCount = debounce(() => {
    if (window.DISQUSWIDGETS)
        window.DISQUSWIDGETS.getCount({ reset: true });
}, 300, false); // eslint-disable-line no-magic-numbers

export class CommentCount extends React.Component {
    componentDidMount() {
        this.loadInstance();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps)
            return false;
        return shallowComparison(this.props, nextProps);
    }

    componentDidUpdate(prevProps) {
        if (this.props.shortname !== prevProps.shortname)
            this.cleanInstance();
        this.loadInstance();
    }

    componentWillUnmount() {
        this.cleanInstance();
    }

    loadInstance() {
        const doc = window.document;
        if (doc.getElementById(COMMENT_COUNT_SCRIPT_ID))
            queueResetCount();
        else
            insertScript(`https://${this.props.shortname}.disqus.com/count.js`, COMMENT_COUNT_SCRIPT_ID, doc.body);
    }

    cleanInstance() {
        const doc = window.document;
        removeScript(COMMENT_COUNT_SCRIPT_ID, doc.body);

        // count.js only reassigns this window object if it's undefined.
        window.DISQUSWIDGETS = undefined;
        removeResources();
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { shortname, config, children, className, ...rest } = this.props;
        const additionalClass = className ? ` ${className}` : '';
        return (
            <span
                {...rest}
                className={`${COMMENT_COUNT_CLASS}${additionalClass}`}
                data-disqus-identifier={config.identifier}
                data-disqus-url={config.url}
            >
                {children}
            </span>
        );
    }
}

CommentCount.propTypes = {
    shortname: PropTypes.string.isRequired,
    config: PropTypes.shape({
        identifier: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
};
