import React from 'react';
import ReactDOM from 'react-dom';
import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

/* eslint-disable max-len */
const ARTICLES = {
    'article-1': {
        id: 'article-1',
        url: 'http://example.com/article-1/',
        title: 'Article 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://user-images.githubusercontent.com/16360374/113202550-b9931e00-921f-11eb-9bd2-7ac009841e08.jpeg',
        featuredComment: '3236451753',
    },
    'article-2': {
        id: 'article-2',
        url: 'http://example.com/article-2/',
        title: 'Article 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://user-images.githubusercontent.com/16360374/113202515-ae3ff280-921f-11eb-81a7-675d0c4d3c90.jpeg',
    },
    'article-3': {
        id: 'article-3',
        url: 'http://example.com/article-3/',
        title: 'Article 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://user-images.githubusercontent.com/16360374/113202469-a1230380-921f-11eb-813c-f1fe231cd5ba.jpeg',
    },
    'article-4': {
        id: 'article-4',
        url: 'http://example.com/article-4/',
        title: 'Article 4',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://user-images.githubusercontent.com/16360374/113202319-7a64cd00-921f-11eb-8b1c-186a85adef93.jpeg',
    },
    'article-5': {
        id: 'article-5',
        url: 'http://example.com/article-5/',
        title: 'Article 5',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://user-images.githubusercontent.com/16360374/113202658-daf40a00-921f-11eb-9803-e0aa28953abd.jpeg',
    },
    'article-6': {
        id: 'article-6',
        url: 'http://example.com/article-6/',
        title: 'Article 6',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://user-images.githubusercontent.com/16360374/113202745-00811380-9220-11eb-95d8-4824afa2f973.jpeg',
    },
};
/* eslint-enable */

class Home extends React.Component {
    render() {
        return (
            <div className="article-list">
                <h1 className="page-header">Disqus React</h1>
                {Object.keys(ARTICLES).map(key => {
                    const data = ARTICLES[key];
                    const countConfig = {
                        url: data.url,
                        identifier: data.id,
                    };
                    return (
                        <div key={data.id} className="article-item">
                            <div className="article-image-wrapper">
                                <img src={data.image} alt={data.title} />
                            </div>
                            <div className="article-preview-wrapper">
                                <h2>{data.title}</h2>
                                <p>{data.body}</p>
                                {data.featuredComment ?
                                    <div>
                                        <CommentEmbed commentId={data.featuredComment} height={180} />
                                    </div>
                                    : null
                                }
                                <a href={`#${data.id}`}>
                                    <CommentCount
                                        shortname={this.props.disqusShortname}
                                        config={countConfig}
                                    >
                                        comments
                                    </CommentCount>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

class Article extends React.Component {
    handleNewComment(comment) {
        window.console.info(`New comment posted with id ${comment.id} and message: ${comment.text}`);
    }

    render() {
        const data = ARTICLES[this.props.id];
        const threadConfig = {
            url: data.url,
            identifier: data.id,
            title: data.title,
            onNewComment: this.handleNewComment,
        };

        return (
            <div className="article">
                <div className="article-header">
                    <img src={data.image} alt={data.title} />
                </div>
                <div className="article-body">
                    <h1>{data.title}</h1>
                    <p>{data.body}</p>
                    <DiscussionEmbed shortname={this.props.disqusShortname} config={threadConfig} />
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({
            disqusShortname: 'disqus-react',
        }, this.getStateFromHash());
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState(this.getStateFromHash());
        }, false);
    }

    getStateFromHash() {
        return {
            articleId: window.location.hash.slice(1),
        };
    }

    changeShortname() {
        this.setState({
            disqusShortname: this.state.disqusShortname === 'disqus-react' ? 'testadgshjklasdfadfs' : 'disqus-react',
        });
    }

    navigateHome() {
        this.setState({
            articleId: null,
        });
    }

    render() {
        return (
            <div className="container">
                {this.state.articleId ?
                    <div>
                        <Article
                            id={this.state.articleId}
                            disqusShortname={this.state.disqusShortname}
                        />
                        <div className="button-wrapper">
                            <button onClick={this.navigateHome.bind(this)}>Back</button>
                        </div>
                    </div>
                    : <Home
                        disqusShortname={this.state.disqusShortname}
                    />
                }
                <div className="button-wrapper">
                    <button onClick={this.changeShortname.bind(this)}>Change shortname</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    window.document.getElementById('app')
);
