import { describe, it, expect } from 'vitest';
import { getServicePrice } from './priceCalculator';
import type { Service, WebConfig } from '../types/service.types';

describe('getServicePrice', () => {
  it('devuelve el precio base cuando el servicio no es Web', () => {
    const seoService: Service = {
      id: 1,
      title: 'SEO',
      description: 'Posicionament orgànic al cercador per atraure trànsit qualificat',
      price: 300,
    };

    const result = getServicePrice(seoService);

    expect(result).toBe(300);
  });

  it('calcula el precio del servicio Web sumando páginas e idiomas', () => {
    const webService: Service = {
      id: 2,
      title: 'Web',
      description: "Disseny i desenvolupament d'una web responsive a mida",
      price: 500,
    };
    const webConfig: WebConfig = {
      pages: 3,
      languages: 2,
    };

    const result = getServicePrice(webService, webConfig);

    expect(result).toBe(650);
  });

  it('devuelve el precio base para un servicio Web si webConfig es undefined', () => {
    const mockWebService: Service = {
      id: 2,
      title: 'Web',
      description: "Disseny i desenvolupament d'una web responsive a mida",
      price: 500,
    };

    const result = getServicePrice(mockWebService, undefined);

    expect(result).toBe(500);
  });
});