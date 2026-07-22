import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BudgetDetail from './BudgetDetail';
import type { Budget } from '../types/budget.types';

vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    addImage: vi.fn(),
    save: vi.fn(),
  })),
}));

vi.mock('html2canvas-pro', () => ({
  default: vi.fn().mockResolvedValue({
    toDataURL: vi.fn().mockReturnValue('data:image/png;base64,fake'),
    width: 100,
    height: 100,
  }),
}));

const mockBudget: Budget = {
    id: 'test-id-1',
    name: 'Test User',
    email: 'test@example.com',
    tel: '600000000',
    checkedServices: ['SEO'],
    webConfig: undefined,
    totalPrice: 300,
    creationDate: '2026-01-10T10:00:00.000Z',
};

function renderBudgetDetail(budget: Budget) {
  return render(
    <MemoryRouter>
      <BudgetDetail budget={budget} />
    </MemoryRouter>
  );
}

describe('BudgetDetail', () => {

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  describe('renderizado de datos del cliente', () => {
    it('muestra el nombre del cliente', () => {
      renderBudgetDetail(mockBudget);

      expect(screen.getByText(mockBudget.name)).toBeInTheDocument();
    });

    it('muestra el email del cliente', () => {
      renderBudgetDetail(mockBudget);

      expect(screen.getByText(mockBudget.email)).toBeInTheDocument();
    });

    it('muestra el teléfono del cliente', () => {
      renderBudgetDetail(mockBudget);

      expect(screen.getByText(mockBudget.tel)).toBeInTheDocument();
    });
  });

  describe('renderizado de servicios y precio', () => {
    it('muestra el servicio contratado con su precio correspondiente', () => {
      renderBudgetDetail(mockBudget);

      expect(screen.getByText(/SEO/i)).toBeInTheDocument();
      expect(screen.getByText(/300/i)).toBeInTheDocument();
    });

    it('muestra el precio total del presupuesto', () => {
      renderBudgetDetail(mockBudget);

      expect(screen.getByText(new RegExp(`${mockBudget.totalPrice}`, 'i'))).toBeInTheDocument();
    });
  });

  describe('botón Copiar URL', () => {
    it('llama a navigator.clipboard.writeText al hacer clic', () => {
      renderBudgetDetail(mockBudget);

      const button = screen.getByText('Copiar URL');
      fireEvent.click(button);

      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('cambia el texto del botón a "Copiat!" tras el clic', () => {
      renderBudgetDetail(mockBudget);

      const button = screen.getByText('Copiar URL');
      fireEvent.click(button);

      expect(screen.getByText('Copiat!')).toBeInTheDocument();
    });
  });

  describe('botón Descarregar PDF', () => {
    it('cambia el texto del botón a "Descarregat!" tras el clic', () => {
      renderBudgetDetail(mockBudget);

      const button = screen.getByText('Descarregar PDF');
      fireEvent.click(button);

      expect(screen.getByText('Descarregat!')).toBeInTheDocument();
    });
  });

});