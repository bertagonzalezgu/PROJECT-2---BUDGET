
export interface FormInputs{
    name: string;
    tel : string;
    email: string;
}

export interface ClientFormProps{
    onClientSubmit: (data: FormInputs) => void
}