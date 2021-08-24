/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
// Components
import { Recommendations } from '../src/index';
// Constants
import {
    RECOMMENDATIONS_ID,
    RECOMMENDATIONS_SCRIPT_ID,
} from '../src/constants';


const SHORTNAME = 'testing';
const DISQUS_CONFIG = {
    url: 'https://example.com/',
    title: 'Example Title',
    identifier: 'tester',
};

const Component = (props) =>
    <Recommendations
        data-testid='disqus-recommendations'
        shortname={SHORTNAME}
        {...props}
    />;


// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct attributes', () => {
    const { getByTestId } = render(<Component config={DISQUS_CONFIG} />);
    // Check that the correct ID is added
    expect(getByTestId('disqus-recommendations')).toHaveAttribute('id', RECOMMENDATIONS_ID);
});

test('Creates window.disqus_config', () => {
    render(<Component config={DISQUS_CONFIG} />);
    expect(global.window.disqus_config).toBeTruthy();
});

test('Inserts the script correctly', () => {
    const { baseElement } = render(<Component config={DISQUS_CONFIG} />);
    const scriptQuery = baseElement.querySelectorAll(`#${RECOMMENDATIONS_SCRIPT_ID}`);
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/recommendations.js');
});

test('Cleans script and window attributes on unmount', () => {
    const { baseElement, unmount } = render(<Component config={DISQUS_CONFIG} />);
    unmount();
    const scriptQuery = baseElement.querySelectorAll(`#${RECOMMENDATIONS_SCRIPT_ID}`);
    // Make sure the script is removed
    expect(scriptQuery.length).toEqual(0);
    // Make sure the resources created by the embed script are removed
    const resourcesQuery = baseElement.querySelectorAll('link[href*="disquscdn.com/next/recommendations"]');
    expect(resourcesQuery.length).toEqual(0);
    // Make sure window.DISQUS is removed
    expect(global.window.DISQUS_RECOMMENDATIONS).toBeUndefined();
});
