export interface Service{
    title: string;
    description: string;
    price: number
};

export interface ServiceCardProps{
    serviceData: Service;
}
