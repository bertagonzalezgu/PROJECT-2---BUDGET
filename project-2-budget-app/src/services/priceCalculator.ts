import type { Service, WebConfig } from "../types/service.types";

export default function calculatePrice(services: Service[], selectedIds: Set<number>, configs : WebConfig){

    const totalPrice = services
                        .filter(service => selectedIds.has(service.id))
                        .reduce((suma, service) => {
                            if(service.title === "Web"){
                                return suma + service.price + (configs.pages + configs.languages) * 30
                            }else{
                                return suma + service.price
                            }
                        }, 0)

        return totalPrice;   
}