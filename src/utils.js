import React from 'react';


export function insertScript(src, id, parentElement) {
    const script = window.document.createElement('script');
    script.async = true;
    script.src = src;
    script.id = id;
    parentElement.appendChild(script);
    return script;
}

export function removeScript(id, parentElement) {
    const script = window.document.getElementById(id);
    if (script)
        parentElement.removeChild(script);
}

export function removeResources() {
    // Remove the bundles that the Disqus scripts add to prevent duplicated resources when navigating between pages
    const disqusResources = window.document.querySelectorAll(
        // eslint-disable-next-line max-len
        'link[href*="disquscdn.com/next/embed"], link[href*="disquscdn.com/next/recommendations"], link[href*="disqus.com/next/config.js"], script[src*="disquscdn.com/next/embed"], script[src*="disqus.com/count-data.js"], iframe[title="Disqus"]'
    );
    disqusResources.forEach(el => el.remove());
}

export function debounce(func, wait, runOnFirstCall) {
    let timeout;
    return function () {
        const context = this; // eslint-disable-line consistent-this
        const args = arguments;

        const deferredExecution = function () {
            timeout = null;
            if (!runOnFirstCall)
                func.apply(context, args);
        };

        const callNow = runOnFirstCall && !timeout;

        window.clearTimeout(timeout);
        timeout = setTimeout(deferredExecution, wait);

        if (callNow)
            func.apply(context, args);
    };
}

export function isReactElement(element) {
    if (React.isValidElement(element)) {
        return true;
    } else if (Array.isArray(element)) {
        return element.some((value) =>
            React.isValidElement(value)
        );
    }
    return false;
}

export function shallowComparison(currentProps, nextProps) {
    // Perform a comparison of all props, excluding React Elements, to prevent unnecessary updates
    const propNames = new Set(Object.keys(currentProps), Object.keys(nextProps)); // eslint-disable-line no-undef
    for (const name of propNames) {
        if (typeof currentProps[name] === 'object') {
            if (shallowComparison(currentProps[name], nextProps[name]))
                return true;
        } else if (currentProps[name] !== nextProps[name] && !isReactElement(currentProps[name])) {
            return true;
        }
    }
    return false;
}
