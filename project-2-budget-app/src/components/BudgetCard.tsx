import type { Budget } from '../types/budget.types'
import { Link } from 'react-router-dom'
import arrowRight from '../assets/icons/arrow_right_blue.svg'
interface BudgetCardProps{
    budget: Budget
}

export default function BudgetCard({budget} : BudgetCardProps){

    return (
        <Link to={`/budget?id=${budget.id}`} className="group block w-full">
            <section className="w-full rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 my-3 sm:my-4 border flex flex-col md:flex-row bg-white border-gray-100 justify-between items-start md:items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-blue-50/40 hover:border-blue-200">
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate mb-1">{budget.name}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">{budget.email}</p>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">{budget.tel}</p>
                </div>
                <div className="flex-1 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                    <h3 className="text-xs sm:text-sm text-gray-800 font-bold mb-1">Serveis contractats:</h3>
                    <ul className="list-disc list-inside text-xs sm:text-sm font-medium text-gray-600 space-y-1">
                        {budget.checkedServices.map(service => (
                            <li key={service} className="truncate">{service} {service === "Web" && budget.webConfig && (
                                <span className="text-gray-500 text-xs">{" "}({budget.webConfig.pages} pàgines, {budget.webConfig.languages} llenguatges)</span>
                            )}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                    <div>
                        <h3 className="text-xs text-gray-500 font-semibold block mr-1">Total:</h3>
                        <span className="text-xl sm:text-2xl font-extrabold text-gray-800">{budget.totalPrice}€</span>
                    </div>
                    <div className="transition-all duration-200 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
                        <img className="w-6 h-6 sm:w-8 sm:h-8" src={arrowRight} alt="Arrow right" />
                    </div>
                </div>
            </section>
        </Link>
    );
};