import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useSearchFilter from './useSearchFilter';
import type { Budget } from '../types/budget.types';

const budgets: Budget[] = [{
                            id: 'test-id-1',
                            name: 'Test User',
                            email: 'test@example.com',
                            tel: '600000000',
                            checkedServices: ['SEO'],
                            webConfig: undefined,
                            totalPrice: 300,
                            creationDate: '2026-01-10T10:00:00.000Z',
                            },
                            {
                            id: 'test-id-2',
                            name: 'Test User 2',
                            email: 'test2@example.com',
                            tel: '600000002',
                            checkedServices: ['Web'],
                            webConfig: {pages: 2, languages: 3},
                            totalPrice: 650,
                            creationDate: '2026-03-05T10:00:00.000Z',
                            },
                            {
                            id: 'test-id-3',
                            name: 'Test User 3',
                            email: 'test3@example.com',
                            tel: '600000003',
                            checkedServices: ['SEO', 'Ads'],
                            webConfig: undefined,
                            totalPrice: 700,
                            creationDate: '2026-02-15T10:00:00.000Z',
                            },
                        ];

describe('useSearchFilter', () => {

  describe('filteredBudgets (búsqueda por nombre)', () => {
    it('filtra los presupuestos cuyo nombre contiene el searchTerm', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      act(() => {
        result.current.setSearchTerm('Test User 2');
      });

      expect(result.current.filteredBudgets.length).toBe(1)
    });

    it('devuelve todos los presupuestos cuando searchTerm está vacío', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      expect(result.current.filteredBudgets.length).toBe(3);
    });

    it('no distingue mayúsculas/minúsculas', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      act(() => {
        result.current.setSearchTerm('USER 2');
      });

      expect(result.current.filteredBudgets.length).toBe(1);
      expect(result.current.filteredBudgets[0].id).toBe('test-id-2');
    });
  });

  describe('handleSortFilter', () => {
    it('cambia el sortField y resetea sortDirection a "desc" cuando el campo es distinto al actual', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      act(() => {
        result.current.handleSortFilter('amount');
      });

      expect(result.current.sortField).toBe('amount');
      expect(result.current.sortDirection).toBe('desc');
    });

    it('invierte sortDirection cuando se llama con el mismo campo activo', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      act(() => {
        result.current.handleSortFilter('date');
      });

      expect(result.current.sortDirection).toBe('asc');
    });
  });

  describe('ordenación de filteredBudgets', () => {
    it('ordena por date correctamente', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      const ids = result.current.filteredBudgets.map(b => b.id);
      expect(ids).toEqual(['test-id-2', 'test-id-3', 'test-id-1']);
    });

    it('ordena por amount correctamente', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      act(() => {
        result.current.handleSortFilter('amount');
      });

      const ids = result.current.filteredBudgets.map(b => b.id);
      expect(ids).toEqual(['test-id-3', 'test-id-2', 'test-id-1']);
    });

    it('ordena por name correctamente', () => {
      const { result } = renderHook(() => useSearchFilter(budgets));

      act(() => {
        result.current.handleSortFilter('name');
      });

      const ids = result.current.filteredBudgets.map(b => b.id);
      expect(ids).toEqual(['test-id-3', 'test-id-2', 'test-id-1']);
    });
  });

  describe('inmutabilidad del array original', () => {
    it('no modifica el array budgets original al ordenar', () => {
      const originalOrder = budgets.map(b => b.id);
      renderHook(() => useSearchFilter(budgets));

      const currentBudgetsOrder = budgets.map(b => b.id);
      expect(currentBudgetsOrder).toEqual(originalOrder);
    });
  });

});