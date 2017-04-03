# disqus-react

disqus-react is a component for integrating the Disqus comments embed and comment count into a React.js single-page application. All components support live reloads when new prop data is received.

Installation
============

Coming soon.

Basic Usage
===========

On a typical article page with the comment count below the title, and discussion below the article body.

```
import React from 'react';
import { DisqusThread, DisqusCommentCount } from 'disqus-react';

class Article extends React.Component {
    render() {
        const disqusShortname = 'example';
        const disqusConfig = {
            url: this.props.article.url,
            identifier: this.props.article.id,
            title: this.props.article.title,
        };

        return (
            <div className="article">
                <h1>{this.props.article.title}</h1>
                <DisqusCommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                </DisqusCommentCount>
                <p>{this.props.article.body}</p>
                <DisqusThread shortname={disqusShortname} config={disqusConfig} />
            </div>
        );
    }
}
```

The `<DisqusThread />` component is limited to one instance in the entire DOM at a time. If multiple are included, only one will be loaded. The component will handle updates to both the `config` and `shortname` props and reload appropriately with the new discussion thread.

The `<DisqusCommentCount />` component may include multiple instances on the same page with different `config` variables (e.g. an article list showing the comment count for all). However, all threads on the site must be under the same primary site `shortname`. If the component receives a new `shortname`, all instances will be reset with counts for threads matching the updated site.
