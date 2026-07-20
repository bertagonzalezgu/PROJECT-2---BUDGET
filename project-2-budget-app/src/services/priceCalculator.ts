import type { Service, WebConfig } from "../types/service.types";


export function getServicePrice(service: Service, configs?: WebConfig): number{
    let servicePrice;

        if(service.title === "Web"){
            if(configs === undefined){
                servicePrice = service.price
            }else{
                servicePrice = service.price + (configs.pages + configs.languages) * 30
            }
        }else{
            servicePrice = service.price
        }

        return servicePrice
}

export default function calculatePrice(services: Service[], selectedIds: Set<number>, configs : WebConfig){

    const totalPrice = services
                        .filter(service => selectedIds.has(service.id))
                        .reduce((suma, service) => suma + getServicePrice(service, configs), 0);
        return totalPrice;   
}