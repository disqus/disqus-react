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
        featuredComment: '3236451753',
    },
    'article-2': {
        id: 'article-2',
        url: 'http://example.com/article-2/',
        title: 'Article 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    'article-3': {
        id: 'article-3',
        url: 'http://example.com/article-3/',
        title: 'Article 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    'article-4': {
        id: 'article-4',
        url: 'http://example.com/article-4/',
        title: 'Article 4',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    'article-5': {
        id: 'article-5',
        url: 'http://example.com/article-5/',
        title: 'Article 5',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    'article-6': {
        id: 'article-6',
        url: 'http://example.com/article-6/',
        title: 'Article 6',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
};
/* eslint-enable */

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                {Object.keys(ARTICLES).map(key => {
                    const data = ARTICLES[key];
                    const countConfig = {
                        url: data.url,
                        identifier: data.id,
                    };
                    return (
                        <div key={data.id} className="article">
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
                <h1>{data.title}</h1>
                <p>{data.body}</p>
                <h3>Related Content</h3>
                <div className="row gutters auto">
                    {Object.keys(ARTICLES)
                        .filter(value => value !== data.id)
                        .slice(0, 3) // eslint-disable-line no-magic-numbers
                        .map(relatedKey => {
                            const relatedData = ARTICLES[relatedKey];
                            return (
                                <div key={relatedData.id} className="col">
                                    <a href={`#${relatedData.id}`}>
                                        <h4>{relatedData.title}</h4>
                                        <div className="placeholder-box">&nbsp;</div>
                                    </a>
                                </div>
                            );
                        }
                    )}
                </div>
                <DiscussionEmbed shortname={this.props.disqusShortname} config={threadConfig} />
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({
            disqusShortname: 'thegermaphobe',
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
            disqusShortname: this.state.disqusShortname === 'thegermaphobe' ? 'testadgshjklasdfadfs' : 'thegermaphobe',
        });
    }

    render() {
        return (
            <div className="container">
                {this.state.articleId ?
                    <Article id={this.state.articleId} disqusShortname={this.state.disqusShortname} />
                    : <Home disqusShortname={this.state.disqusShortname} />
                 }
                <button onClick={this.changeShortname.bind(this)}>Change shortname</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    window.document.getElementById('app')
);
