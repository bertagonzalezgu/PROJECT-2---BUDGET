import type { Service } from "../types/service.types";

export default function calculatePrice(services: Service[], selectedIds: Set<number>){

    const totalPrice = services.filter(service => selectedIds.has(service.id))
                      .reduce((suma, service) => suma + service.price, 0)

        return totalPrice;   

}