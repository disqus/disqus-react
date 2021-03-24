/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
// Components
import { CommentEmbed } from '../src/index.js';


const commentConfig = {
    commentId: '4817304024',
    showMedia: true,
    showParentComment: false,
};

const getExpectedSrc = (config) => {
    const RADIX_BASE = 36;
    const post = Number(config.commentId).toString(RADIX_BASE);
    const parentParam = config.showParentComment ? '1' : '0';
    const mediaParam = config.showMedia ? '1' : '0';
    return `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;
};

const Component = (props) =>
    <CommentEmbed
        data-testid='comment-embed'
        {...props}
    />;


// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct script src', () => {
    const { getByTestId } = render(<Component {...commentConfig} />);
    // Check the iframe has the correct 'src'
    const expectedSrc = getExpectedSrc(commentConfig);
    expect(getByTestId('comment-embed')).toHaveAttribute('src', expectedSrc);
});

test('Has correct custom dimensions', () => {
    const customWidth = 680;
    const customHeight = 320;

    const { getByTestId } = render(
        <Component
            width={customWidth}
            height={customHeight}
            {...commentConfig}
        />
    );
    // Check the correct 'width' is assigned
    expect(getByTestId('comment-embed')).toHaveAttribute('width', customWidth.toString());
    // Check the correct 'height' is assigned
    expect(getByTestId('comment-embed')).toHaveAttribute('height', customHeight.toString());
});

test('Has correct classes', () => {
    const { getByTestId } = render(
        <Component
            className='embedded-comment'
            {...commentConfig}
        />
    );
    // Check that the 'className' is assigned to the iframe
    expect(getByTestId('comment-embed')).toHaveAttribute('class', commentConfig.className);
});
