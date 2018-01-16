import React from 'react'
import renderer from 'react-test-renderer';

import withLoading from './withLoading'


const Loaded = ({data}) => <div>{data.loaded}</div>

const ComponentWithLoading = withLoading(Loaded)

it('renders loading', () => {
  const data = {
    loading: true
  }
  const tree = renderer
    .create(<ComponentWithLoading data={data} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loaded', () => {
  const data = {
    loaded: 'component loaded'
  }
  const tree = renderer
    .create(<ComponentWithLoading data={data} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
