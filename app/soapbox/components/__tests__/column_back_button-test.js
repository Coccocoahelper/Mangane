import React from 'react';
import ColumnBackButton from '../column_back_button';
import { createComponentWithIntl } from 'soapbox/test_helpers';

describe('<ColumnBackButton />', () => {
  it('renders correctly', () => {
    const component = createComponentWithIntl(<ColumnBackButton />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
