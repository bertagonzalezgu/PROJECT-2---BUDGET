export interface Service{
    id: number;
    title: string;
    description: string;
    price: number
};

export interface WebConfig{
    pages: number;
    languages: number;
}

export interface WebConfiguratorProps{
    webConfig: WebConfig;
    onPagesChange: (value: number) => void;
    onLanguagesChange: (value: number) => void;
}
export interface ServiceCardProps{
    serviceData: Service;
    isServiceSelected: boolean;
    onToggle: (id: number) => void;
}
