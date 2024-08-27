import { render, screen } from '@testing-library/react';
import App from './App';
import TestRenderer from 'react-test-renderer';
import AddCar from './components/AddCar';

test('renders a snapshot', () => {
  const { asFragment } = render(<AddCar />);
  expect(asFragment()).toMatchSnapshot();
});
