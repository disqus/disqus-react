# disqus-react

disqus-react is a component for integrating the Disqus comments embed and comment count into a React.js single-page application. All components support live reloads when new prop data is received.

Installation
============

Using NPM:

```bash
$ npm install disqus-react
```

Basic Usage
===========

On a typical article page with the comment count below the title, as well as an embedded comment and discussion below the article body.

```js
import React from 'react';
import Disqus from 'disqus-react';
// Alternatively, import specific members:
// import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

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
                <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                </Disqus.CommentCount>
                
                <p>{this.props.article.body}</p>
                
                <Disqus.CommentEmbed 
                    commentId={this.props.article.featuredComment}
                    showMedia={true}
                    height={160}
                />
                
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </div>
        );
    }
}
```

The `<DiscussionEmbed />` component is limited to one instance in the entire DOM at a time. If multiple are included, only one will be loaded. The component will handle updates to both the `config` and `shortname` props and reload appropriately with the new discussion thread.  

The `<CommentCount />` component may include multiple instances on the same page with different `config` variables (e.g. an article list showing the comment count for all). However, all threads on the site must be under the same primary site `shortname`. If the component receives a new `shortname`, all instances will be reset with counts for threads matching the updated site.  

The `<CommentEmbed />` component may include multiple instances on the same page with different `commentId` variables. Additionally, this component does not require that the embedded comment be under the same primary site `shortname`.  

Troubleshooting
===========

Make sure that `disqusProps.config.url` must match `Website URL` found at `https://your-project-shortname.disqus.com/admin/settings/general/`
