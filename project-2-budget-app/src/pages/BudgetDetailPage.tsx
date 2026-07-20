import DataServices from '../data/services.json'
import type { Budget } from '../types/budget.types'
import { getServicePrice } from '../services/priceCalculator'
import type { Service } from '../types/service.types'

interface BudgetDetailProps{
    budget: Budget
}

export default function BudgetDetail({budget}: BudgetDetailProps){

    const confirmedServices = budget.checkedServices.map((name) => DataServices.services.find(service => service.title === name)).filter((service): service is Service => service !== undefined)
    
    const servicesWithPrice = confirmedServices.map((service) => ({name: service.title, price: getServicePrice(service, budget.webConfig)}))

    return (
        <div>
        <h1>Desglossament del pressupost</h1>
        <span>Nº de pressupost: #{budget.id}</span>
        <div>
            <div>
                <div>
                    <h3>Data de creació: </h3>
                    <p>{budget.creationDate}</p>
                </div>
                <div>
                    <h3>Dades del Client: </h3>
                    <p>{budget.name}</p>
                    <p>{budget.email}</p>
                    <p>{budget.tel}</p>
                </div>
            </div>
            <div>
                <h3>Serveis contractats: </h3>
                <ul>
                    {servicesWithPrice.map((service) => (
                        <li key={service.name}>
                            <span>{service.name}</span>
                            <span>{service.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Preu Total: </h3>
                <p>{budget.totalPrice}</p>
            </div>
        </div>
        </div>
    )
}