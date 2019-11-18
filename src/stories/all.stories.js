import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { withKnobs } from "@storybook/addon-knobs";
import results from '../../.jest-test-results.json';

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(withTests({ results }))
