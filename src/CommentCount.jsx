import React from 'react';
import { insertScript, removeScript, debounce, shallowComparison } from './utils';

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

    componentWillUpdate(nextProps) {
        console.log('componentWillUpdate')
        if (this.props.shortname !== nextProps.shortname)
            this.cleanInstance();
    }

    componentDidUpdate() {
      // if (this.props.shortname !== nextProps.shortname)
      //       this.cleanInstance();
        this.loadInstance();
    }

    loadInstance() {
        const doc = window.document;
        if (doc.getElementById('dsq-count-scr'))
            queueResetCount();
        else
            insertScript(`https://${this.props.shortname}.disqus.com/count.js`, 'dsq-count-scr', doc.body);
    }

    cleanInstance() {
        const body = window.document.body;
        removeScript('dsq-count-scr', body);

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
