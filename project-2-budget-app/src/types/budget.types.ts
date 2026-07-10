import type { FormInputs } from "./form.types";
import type { WebConfig } from "./service.types";
export interface PriceCounterProps {
    total: number;
}

export interface UniqueId{
    id: string;
    creationDate: string
}

export interface Budget extends UniqueId, FormInputs{
    checkedServices: string[];
    totalPrice: number;
    webConfig?: WebConfig
}