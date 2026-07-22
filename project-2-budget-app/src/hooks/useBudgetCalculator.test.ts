import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useBudgetCalculator from './useBudgetCalculator';
import type { Service } from '../types/service.types';

const mockServices: Service[] = [
  { id: 1, title: 'SEO', description: 'Posicionament orgànic al cercador per atraure trànsit qualificat', price: 300 },
  { id: 2, title: 'Ads', description: 'Campanyes de publicitat online (Google/Meta Ads) per generar clients ràpidament', price: 400 },
  { id: 3, title: 'Web', description: "Disseny i desenvolupament d'una web responsive a mida", price: 500 },
];

describe('useBudgetCalculator', () => {
  it('añade el id del servicio a selectedServices cuando no estaba seleccionado', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
      result.current.toggleService(1);
    });

    expect(result.current.selectedServices.has(1)).toBe(true);
    expect(result.current.selectedServices.size).toBe(1);
    });

  it('elimina el id del Set cuando ya estaba', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
      result.current.toggleService(1);
    });

    act(() => {
      result.current.toggleService(1);
    });

    expect(result.current.selectedServices.has(1)).toBe(false);
    expect(result.current.selectedServices.size).toBe(0);
    });

  it('actualiza webConfig.pages cuando el valor es válido', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
        result.current.pagesCounter(3);
    });

    expect(result.current.webConfig.pages).toBe(3);
    });

it('NO actualiza webConfig.pages cuando el valor es menor a 1', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
        result.current.pagesCounter(0);
    });

    expect(result.current.webConfig.pages).toBe(1);
    });

it('Actualiza cuando el valor de idiomas es válido', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
        result.current.languagesCounter(2);
    });

    expect(result.current.webConfig.languages).toBe(2);
    });

it('No actualiza cuando el valor de idiomas es inválido, menor a 1', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
        result.current.languagesCounter(0);
    });

    expect(result.current.webConfig.languages).toBe(1);
    });

it('recalcula el total correctamente al seleccionar un servicio', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));
    expect(result.current.totalPriceServicesSelected).toBe(0);

    act(() => {
        result.current.toggleService(1);
    });

    expect(result.current.totalPriceServicesSelected).toBe(300);
    });

it('tras seleccionar servicios y cambiar webConfig, al llamar a resetSelection todo vuelve a su estado inicial', () => {
    const { result } = renderHook(() => useBudgetCalculator(mockServices));

    act(() => {
        result.current.toggleService(1);
        result.current.pagesCounter(2);
        result.current.languagesCounter(3)
    });

    act(() => {
        result.current.resetSelection();
    });

    expect(result.current.selectedServices.size).toBe(0)
    expect(result.current.webConfig).toEqual({pages: 1, languages: 1});
    });
});