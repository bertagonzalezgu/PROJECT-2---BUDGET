import { describe, it, expect } from 'vitest';
import budgetGenerator from './idGenerator';
import type { FormInputs } from '../types/form.types';
import type { WebConfig } from '../types/service.types';


describe('budgetGenerator', () => {
  it('devuelve un nuevo presupuesto con ID único, fecha actual, datos del cliente, precio total y la configuración web', () => {
    const clientData: FormInputs = {
        name: "Berta",
        tel: "654213221",
        email: "berta@gmail.com",
    };

    const fakeCheckedServices = ["Web", "Seo"];
    const fakeTotalPrice = 650
    const fakeWebConfig: WebConfig = {pages: 3, languages: 2}

    const result = budgetGenerator(clientData, fakeCheckedServices, fakeTotalPrice, fakeWebConfig);

    expect(result).toEqual({ 
        id: expect.any(String),
        creationDate: expect.any(String),
        ...clientData,
        checkedServices: fakeCheckedServices,
        totalPrice: fakeTotalPrice,
        webConfig: fakeWebConfig
    });
  });

});