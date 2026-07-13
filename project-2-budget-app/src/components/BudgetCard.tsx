import type { Budget } from '../types/budget.types'

interface BudgetCardProps{
    budget: Budget
}

export default function BudgetCard({budget} : BudgetCardProps){

    return (
        <section>
            <div>
                <h1>{budget.name}</h1>
                <p>{budget.email}</p>
                <p>{budget.tel}</p>
            </div>
            <div>
                <h3>Serveis contractats:</h3>
                <ul>
                    {budget.checkedServices.map(service => (
                        <li key={service}>{service}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Total:</h2>
                <span>{budget.totalPrice}</span>
            </div>
        </section>
    )
}