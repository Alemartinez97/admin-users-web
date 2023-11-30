import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// eslint-disable-next-line to the line before.
// eslint-disable-next-line to the line before.
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line to the line before.
import configureStore from 'redux-mock-store';
import { SnackbarProvider } from 'notistack';
import Signup from '../../../pages/signup/signup';
// eslint-disable-next-line to the line before.
jest.mock('../../../utils/api', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));
const mockStore = configureStore([]);
const store = mockStore({});

describe('<Signup />', () => {
  it('renders Signup component', async () => {
    // Renderiza el componente dentro del contexto de la tienda y el enrutador
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <Router>
            <Signup />
          </Router>
        </SnackbarProvider>
      </Provider>
    );
    const password = getAllByText('Contraseña invalida, debe tener minimo 8 caracteres con numeros y letras');
    const name = getAllByText('Nombre Invalido');
    fireEvent.click(getByText('Sign up'));
    expect(password.length).toBeGreaterThan(1);
    expect(password.length).toBeGreaterThan(0);
    expect(name.length).toBeGreaterThan(1);
    expect(name.length).toBeGreaterThan(0);
    expect(screen.getByText('Iniciar sesiôn')).toBeTruthy()
    expect(screen.getByText('Crear una cuenta')).toBeTruthy()
  });
});
