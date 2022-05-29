 import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
 import App from './App';
import store from './state/redux-store';

 test('renders without crashing', () => {
 const div = document.createElement('div');
 render(<Provider store={store}><App/></Provider>, div);
 unmountComponentAtNode(div);
 });
unmountComponentAtNode