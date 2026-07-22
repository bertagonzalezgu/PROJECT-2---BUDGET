import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useBudgetList from './useBudgetList'
import type { Budget } from '../types/budget.types';

describe('useBudgetList', () => {
  it('añade un presupuesto a la lista cuando se llama a addBudgetToList', () => {
    const { result } = renderHook(() => useBudgetList());

    const newBudget: Budget = {
                                id: 'test-id-1',
                                name: 'Test User',
                                email: 'test@example.com',
                                tel: '600000000',
                                checkedServices: ['SEO'],
                                webConfig: undefined,
                                totalPrice: 300,
                                creationDate: new Date().toISOString(),
                                };

    act(() => {
      result.current.addBudgetToList(newBudget);
    });

    expect(result.current.budgets).toHaveLength(1);
  });
});