export interface Service{
    id: number;
    title: string;
    description: string;
    price: number
};

export interface ServiceCardProps{
    serviceData: Service;
    isServiceSelected: boolean;
    onToggle: (id: number) => void;
}
