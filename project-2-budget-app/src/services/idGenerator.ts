import type { FormInputs } from "../types/form.types";
import type { Budget } from "../types/budget.types";
import type { WebConfig } from "../types/service.types";

export default function budgetGenerator(data: FormInputs, checkedServices: string[], totalPrice: number, webConfig?: WebConfig): Budget{

    const newBudget = { id: crypto.randomUUID(),
                        creationDate: new Date().toISOString(),
                        ...data,
                        checkedServices,
                        totalPrice,
                        webConfig};

                        return newBudget;
}