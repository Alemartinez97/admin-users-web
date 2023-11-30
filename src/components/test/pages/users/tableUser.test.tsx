import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line to the line before.
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line to the line before.
import configureStore from 'redux-mock-store';
import { SnackbarProvider } from 'notistack';
import TableUser from '../../../pages/users/tableUser';

jest.mock('../../../utils/api', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));
const mockStore = configureStore([]);
const store = mockStore({});

describe('<TableUser />', () => {
  it('renders users component', async () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <Router>
            <TableUser />
          </Router>
        </SnackbarProvider>
      </Provider>
    );
    const newUser = getAllByText('Nuevo Usuario');
    expect(newUser.length).toBeGreaterThan(0);
    expect(newUser).toBeTruthy();
  });
});
