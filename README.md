# disqus-react  

[![npm version](https://badge.fury.io/js/disqus-react.svg)](https://badge.fury.io/js/disqus-react "View this package on npm")  

A package for integrating [Disqus](http://disqus.com/) services into React applications.  

## Installation  

Using [npm](https://www.npmjs.com/):  

```bash
$ npm install --save disqus-react
```

Using [yarn](https://yarnpkg.com/):
```bash
$ yarn add disqus-react
```

## Usage  

### DiscussionEmbed  

This is the component that will load the main Disqus comments section.

```js
import { DiscussionEmbed } from 'disqus-react';

<DiscussionEmbed
    shortname='example'
    config={
        url: this.props.article.url,
        identifier: this.props.article.id,
        title: this.props.article.title,
    }
/>
```

This component is limited to one instance in the DOM at a time and will handle updates to both the `config` and `shortname` props and reload appropriately with the new discussion thread.  


### CommentCount  

This component will display the comment count for the Disqus thread associated with the provided config.  

```js
import { CommentCount } from 'disqus-react';

<Disqus.CommentCount
    shortname='example'
    config={
        url: this.props.article.url,
        identifier: this.props.article.id,
        title: this.props.article.title,
    }
>
    {/* Placeholder Text */}
    Comments
</Disqus.CommentCount>
```

Multiple instances of this component can be included on the same page with different `config` variables (e.g. an article list showing the comment count for each).
However, all threads on the site must be under the same primary site `shortname`. If the component receives a new `shortname`, all instances will be reset with counts for threads matching the updated site.  


### CommentEmbed  

This component can be used to embed a Disqus comment into your page.  

```js
import { CommentEmbed } from 'disqus-react';

<CommentEmbed
    commentId={this.props.article.featuredCommentId}
    showMedia={true}
    showParentComment={true}
    width={420}
    height={320}
/>
```

Multiple instances of this component may be include on the same page with different `commentId` variables and does not require that the embedded comment be under the same primary site `shortname`.  


## Contributing  

If you'd like to contribute to this package feel free to submit a bug report, feature request, or pull request. Though we would ask that you first read through the [contributing guidelines](https://github.com/disqus/disqus-react/blob/master/docs/CONTRIBUTING.md).
