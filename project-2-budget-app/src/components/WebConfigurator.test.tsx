import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WebConfigurator from './WebConfigurator';

const mockWebConfig = { pages: 3, languages: 2 };

function renderWebConfigurator(onPagesChange = vi.fn(), onLanguagesChange = vi.fn()) {
  render(
    <WebConfigurator
      webConfig={mockWebConfig}
      onPagesChange={onPagesChange}
      onLanguagesChange={onLanguagesChange}
    />
  );
  return { onPagesChange, onLanguagesChange };
}

describe('WebConfigurator', () => {

  describe('renderizado de valores actuales', () => {
    it('muestra el número actual de páginas', () => {
        renderWebConfigurator();

        const elements = screen.getAllByText('3');
        expect(elements[0]).toBeInTheDocument();
    });

    it('muestra el número actual de idiomas', () => {
        renderWebConfigurator();

        const elements = screen.getAllByText('2');
        expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('botones de páginas', () => {
    it('llama a onPagesChange con pages + 1 al pulsar el botón de sumar', () => {
        const { onPagesChange } = renderWebConfigurator();

        const addButton = screen.getByLabelText('Més pàgines 3');
        fireEvent.click(addButton);

        expect(onPagesChange).toHaveBeenCalledWith(4);
    });

    it('llama a onPagesChange con pages - 1 al pulsar el botón de restar', () => {
        const { onPagesChange } = renderWebConfigurator();

        const subtractButton = screen.getByLabelText('Menys pàgines 3');
        fireEvent.click(subtractButton);

        expect(onPagesChange).toHaveBeenCalledWith(2);
    });
  });

  describe('botones de idiomas', () => {
    it('llama a onLanguagesChange con languages + 1 al pulsar el botón de sumar', () => {
      const { onLanguagesChange } = renderWebConfigurator();

      const addButton = screen.getByLabelText('Més idiomes 2');
      fireEvent.click(addButton);

      expect(onLanguagesChange).toHaveBeenCalledWith(3);
    });

    it('llama a onLanguagesChange con languages - 1 al pulsar el botón de restar', () => {
      const { onLanguagesChange } = renderWebConfigurator();

      const subtractButton = screen.getByLabelText('Menys idiomes 2');
      fireEvent.click(subtractButton);

      expect(onLanguagesChange).toHaveBeenCalledWith(1);
    });
  });

  describe('modal informativo', () => {
    it('no muestra el modal al renderizar por defecto', () => {
      renderWebConfigurator();

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('abre el modal de páginas al hacer clic en su icono de información', () => {
      renderWebConfigurator();

      const infoButtons = screen.getAllByAltText('Icono de información');
      fireEvent.click(infoButtons[0]);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('abre el modal de idiomas al hacer clic en su icono de información', () => {
      renderWebConfigurator();

      const infoButtons = screen.getAllByAltText('Icono de información');
      fireEvent.click(infoButtons[1]);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});