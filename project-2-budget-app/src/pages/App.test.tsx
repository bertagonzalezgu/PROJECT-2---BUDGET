import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  describe('renderizado inicial', () => {
    it('muestra la lista de servicios disponibles', () => {
      renderApp();

      expect(screen.getAllByText(/SEO/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Ads/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Web/i)[0]).toBeInTheDocument();
    });

    it('no muestra el formulario de cliente si no hay ningún servicio seleccionado', () => {
      renderApp();

      expect(screen.queryByPlaceholderText(/Nom/i)).not.toBeInTheDocument();
    });
  });

  describe('selección de servicios', () => {
    it('muestra el formulario de cliente al seleccionar un servicio', () => {
      renderApp();

      const seoCheckbox = screen.getByRole('checkbox', { name: /SEO/i });
      fireEvent.click(seoCheckbox);

      expect(screen.getByPlaceholderText(/Nom/i)).toBeInTheDocument();
    });

    it('muestra el WebConfigurator al seleccionar el servicio Web', () => {
      renderApp();

      const webCheckbox = screen.getByRole('checkbox', { name: /Web/i });
      fireEvent.click(webCheckbox);

      expect(screen.getByText(/Nombre de pàgines/i)).toBeInTheDocument();
    });

    it('actualiza el precio total al seleccionar un servicio', () => {
      renderApp();

      const seoCheckbox = screen.getByRole('checkbox', { name: /SEO/i });
      fireEvent.click(seoCheckbox);

      const priceElements = screen.getAllByText(/300/i);
      expect(priceElements.length).toBeGreaterThan(0);
    });
  });

  describe('creación de un presupuesto completo', () => {
    it('añade un presupuesto a BudgetList tras enviar el formulario de cliente', async () => {
  renderApp();

  const seoCheckbox = screen.getByRole('checkbox', { name: /SEO/i });
  fireEvent.click(seoCheckbox);

  fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Ona Costa' } });
  fireEvent.change(screen.getByPlaceholderText(/Telèfon/i), { target: { value: '600000000' } });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'ona@example.com' } });

  const submitButton = screen.getByRole('button', { name: /Sol·licitar pressupost/i });
  fireEvent.click(submitButton);

  expect(await screen.findByText('Ona Costa')).toBeInTheDocument();
});

it('resetea la selección de servicios tras enviar el formulario', async () => {
    renderApp();

    const seoCheckbox = screen.getByRole('checkbox', { name: /SEO/i });
    fireEvent.click(seoCheckbox);

    fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Telèfon/i), { target: { value: '600000000' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /Sol·licitar pressupost/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.queryByPlaceholderText(/Nom i cognoms/i)).not.toBeInTheDocument();
    });
    });
  });

});