/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
// Components
import { DiscussionEmbed } from '../src/index';
// Constants
import {
    EMBED_SCRIPT_ID,
    THREAD_ID,
} from '../src/constants';


const SHORTNAME = 'testing';
const DISQUS_CONFIG = {
    url: 'https://example.com/',
    title: 'Example Title',
    identifier: 'tester',
};

const DISQUS_CONFIG_WITH_SSO_AUTH = {
    ...DISQUS_CONFIG,
    remoteAuthS3: 'remoteAuthS3String',
    apiKey: 'apiKeyString',
};

// This config is only used when the SSO login is present alongside the Disqus login.
const SSO_CONFIG = {
    name: 'SampleNews',
    button: 'http://example.com/images/samplenews.gif',
    icon: 'http://example.com/favicon.png',
    url: 'http://example.com/login/',
    logout: 'http://example.com/logout/',
    profile_url: 'http://example.com/profileUrlTemplate/{username}',
    width: '800',
    height: '400',
};

const Component = (props) =>
    <DiscussionEmbed
        data-testid='disqus-thread'
        shortname={SHORTNAME}
        {...props}
    />;


// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct attributes', () => {
    const { getByTestId } = render(<Component config={DISQUS_CONFIG} />);
    // Check that the correct ID is added
    expect(getByTestId('disqus-thread')).toHaveAttribute('id', THREAD_ID);
});

test('Creates window.disqus_config', () => {
    render(<Component config={DISQUS_CONFIG} />);
    expect(global.window.disqus_config).toBeTruthy();
});

test('Creates window.disqus_config when passed an SSO config', () => {
    const TEST_CONFIG = { ...DISQUS_CONFIG, sso: SSO_CONFIG };
    render(<Component config={TEST_CONFIG} />);
    expect(global.window.disqus_config).toBeTruthy();
});

test('Inserts the script correctly', () => {
    const { baseElement } = render(<Component config={DISQUS_CONFIG} />);
    const scriptQuery = baseElement.querySelectorAll(`#${EMBED_SCRIPT_ID}`);
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/embed.js');
});

test('Inserts the script correctly when passed a remoteAuthS3 string and API Key with an SSO config', () => {
    const TEST_CONFIG = { ...DISQUS_CONFIG_WITH_SSO_AUTH, sso: SSO_CONFIG };
    const { baseElement } = render(<Component config={TEST_CONFIG}/>);
    const scriptQuery = baseElement.querySelectorAll(`#${EMBED_SCRIPT_ID}`);
    expect(scriptQuery.length).toEqual(1);
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/embed.js');
});

test('Inserts the script correctly when passed a remoteAuthS3 string and API Key without an SSO config', () => {
    const TEST_CONFIG = DISQUS_CONFIG_WITH_SSO_AUTH;
    const { baseElement } = render(<Component config={TEST_CONFIG}/>);
    const scriptQuery = baseElement.querySelectorAll(`#${EMBED_SCRIPT_ID}`);
    expect(scriptQuery.length).toEqual(1);
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/embed.js');
});

test('Cleans script and window attributes on unmount', () => {
    const { baseElement, unmount } = render(<Component config={DISQUS_CONFIG} />);
    unmount();
    const scriptQuery = baseElement.querySelectorAll(`#${EMBED_SCRIPT_ID}`);
    // Make sure the embed script is removed
    expect(scriptQuery.length).toEqual(0);
    // Make sure the resources created by the embed script are removed
    // eslint-disable-next-line max-len
    const resourcesQuery = baseElement.querySelectorAll('link[href*="disquscdn.com/next/embed"], link[href*="disqus.com/next/config.js"], script[src*="disquscdn.com/next/embed"]');
    expect(resourcesQuery.length).toEqual(0);
    // Make sure window.DISQUS is removed
    expect(global.window.DISQUS).toBeUndefined();
});
