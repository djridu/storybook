import React from 'react';
import { storiesOf } from '@storybook/react';

import '../index.css';
import App from '../App';

storiesOf('App', module)
    .addParameters({ jest: ['App'] })
    .add('App', () => <App />);
