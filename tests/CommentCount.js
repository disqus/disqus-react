/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
// Components
import { CommentCount } from '../src/index';
// Constants
import {
    COMMENT_COUNT_CLASS,
    COMMENT_COUNT_SCRIPT_ID,
} from '../src/constants';


const SHORTNAME = 'testing';
const DISQUS_CONFIG = {
    url: 'https://example.com/',
    title: 'Example Title',
    identifier: 'tester',
};

const Component = (props) =>
    <CommentCount
        data-testid='comment-count'
        shortname={SHORTNAME}
        {...props}
    />;


// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct config attributes', () => {
    const { getByTestId } = render(<Component config={DISQUS_CONFIG} />);
    // Check that the url is set correctly
    expect(getByTestId('comment-count')).toHaveAttribute('data-disqus-url', DISQUS_CONFIG.url);
    // Check that the identifier is set correctly
    expect(getByTestId('comment-count')).toHaveAttribute('data-disqus-identifier', DISQUS_CONFIG.identifier);
});

test('Has correct classes', () => {
    const customClass = 'custom-class';
    const { getByTestId } = render(
        <Component
            config={DISQUS_CONFIG}
            className={customClass}
        />
    );
    const classList = getByTestId('comment-count').classList;
    // Check for the default class
    expect(classList).toContain(COMMENT_COUNT_CLASS);
    // Check that the custom class is added
    expect(classList).toContain(customClass);
});

test('Displays the correct placeholder text', () => {
    const customPlaceholder = 'Counting...';
    const { getByTestId } = render(
        <Component config={DISQUS_CONFIG}>
            {customPlaceholder}
        </Component>
    );
    expect(getByTestId('comment-count')).toHaveTextContent(customPlaceholder);
});

test('Inserts the script correctly', () => {
    const { baseElement } = render(
        <Component config={DISQUS_CONFIG} />
    );
    const scriptQuery = baseElement.querySelectorAll(`#${COMMENT_COUNT_SCRIPT_ID}`);
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual(`https://${SHORTNAME}.disqus.com/count.js`);
});

test('Cleans script and window attributes on unmount', () => {
    const { baseElement, unmount } = render(
        <Component config={DISQUS_CONFIG} />
    );
    unmount();
    const scriptQuery = baseElement.querySelectorAll(`#${COMMENT_COUNT_SCRIPT_ID}`);
    // Make sure the script is removed
    expect(scriptQuery.length).toEqual(0);
    // Make sure the resources created by the count script are removed
    const resourcesQuery = baseElement.querySelectorAll('script[src*="disqus.com/count-data.js"]');
    expect(resourcesQuery.length).toEqual(0);
    // Make sure window.DISQUSWIDGETS is removed
    expect(global.window.DISQUSWIDGETS).toBeUndefined();
});
