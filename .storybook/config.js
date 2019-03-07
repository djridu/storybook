import React from 'react';
import '@storybook/addon-console';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import { withCssResources } from '@storybook/addon-cssresources';
import { withNotes } from '@storybook/addon-notes';
import centered from '@storybook/addon-centered/react';

import newViewports from './storybookUtils/viewports';
import results from '../jest-test-results.json';

addDecorator(
    withTests({
        results,
    }),
);
addDecorator(centered);
addDecorator(withKnobs);
addDecorator(withCssResources);
addDecorator(withA11y);
addDecorator(withNotes);

addParameters({
    a11y: {
        configure: {},
        options: {
            checks: { 'color-contrast': { options: { noScroll: true } } },
            restoreScroll: true,
        },
    },
    options: {
        name: 'DEMO',
        isFullScreen: false,
        showNav: true,
        showPanel: true,
        panelPosition: 'bottom',
        sortStoriesByKind: false,
        hierarchySeparator: /\/|\./,
        hierarchyRootSeparator: /\|/,
        sidebarAnimations: true,
        enableShortcuts: true,
        theme: themes.dark,
    },
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
            ...newViewports,
        },
    },
    backgrounds: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#eeeeee' },
        { name: 'gray', value: '#cccccc' },
        { name: 'dark', value: '#222222', default: true },
        { name: 'black', value: '#000000' },
    ],
});

function loadStories() {
    const req = require.context('../src', true, /\.story\.(js|jsx)$/);
    req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
