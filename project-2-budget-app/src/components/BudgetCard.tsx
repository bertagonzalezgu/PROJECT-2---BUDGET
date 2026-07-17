import type { Budget } from '../types/budget.types'

interface BudgetCardProps{
    budget: Budget
}

export default function BudgetCard({budget} : BudgetCardProps){

    return (
        <section className="container rounded-3xl shadow-md p-8 my-5 border flex flex-row max-w-3xl mx-auto bg-white border-gray-100 justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{budget.name}</h1>
                <p className="text-sm text-gray-500 font-medium leading-snug max-w-xs tracking-wider">{budget.email}</p>
                <p className="text-sm text-gray-500 font-medium leading-snug max-w-xs tracking-wider">{budget.tel}</p>
            </div>
            <div className='flex flex-col'>
                <h3 className="text-sm text-gray-800 font-bold leading-snug max-w-xs tracking-wide">Serveis contractats:</h3>
                <div>
                    <ul className="list-disc list-inside text-sm font-medium text-gray-700 space-y-1 pl-1">
                    {budget.checkedServices.map(service => (
                        <li key={service}>{service} {service === "Web" && budget.webConfig && (
                            <span>{" "}({budget.webConfig.pages} pàgines, {budget.webConfig.languages} llenguatges)</span>
                        )}</li>
                    ))}
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 font-semibold leading-snug max-w-xs tracking-wider">Total:</h2>
                <span className="text-3xl font-extrabold text-gray-800">{budget.totalPrice}€</span>
            </div>
        </section>
    )
}