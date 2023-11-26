import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SnackbarProvider } from 'notistack';
import Login from '../../../pages/login/login';

jest.mock('../../../utils/api', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));
const mockStore = configureStore([]);
const store = mockStore({});

describe('<Login />', () => {
  it('renders login component', async () => {
    // Renderiza el componente dentro del contexto de la tienda y el enrutador
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <Router>
            <Login />
          </Router>
        </SnackbarProvider>
      </Provider>
    );
    const contraseñaElements = getAllByText('Contraseña');
    fireEvent.click(getByText('Sign in'));
    expect(contraseñaElements.length).toBeGreaterThan(1);
    expect(contraseñaElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Iniciar sesiôn')).toBeTruthy()
    expect(screen.getByText('Crea una cuenta')).toBeTruthy()
  });
});
