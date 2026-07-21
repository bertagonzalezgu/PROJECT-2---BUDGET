import BudgetCard from "./BudgetCard";
import type { Budget } from '../types/budget.types'
import useSearchFilter from "../hooks/useSearchFilter";
interface BudgetListProps{
    budgets: Budget[]
}

export default function BudgetList({budgets}: BudgetListProps){

    const {searchTerm, sortField, sortDirection, filteredBudgets, handleSortFilter, setSearchTerm} = useSearchFilter(budgets);

    if(budgets.length === 0){
        return <p className="text-gray-500 font-medium text-center sm:text-left py-4">No tens cap pressupost en curs.</p>
    }

    const getSortBtn = (field: string) => {
        const isActive = sortField === field;
            return `cursor-pointer transition-all duration-200 flex items-center gap-1 select-none text-xs sm:text-sm ${
            isActive ? "text-blue-600 font-bold scale-105" : "text-gray-500 font-medium hover:text-gray-900"}`
        };

    return(
        <section className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Pressupostos en curs:
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." className="w-full sm:w-48 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        <div className="flex gap-3 sm:gap-4">
                            <button type="button" onClick={() => handleSortFilter("date")} className={getSortBtn("date")}>
                                Data {sortField === "date" && (
                                        <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>
                                )}
                            </button>
                            <button type="button" onClick={() => handleSortFilter("amount")} className={getSortBtn("amount")}>
                                Import {sortField === "amount" && (
                                        <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>
                                )}
                            </button>
                            <button type="button" onClick={() => handleSortFilter("name")} className={getSortBtn("name")}>
                                Nom {sortField === "name" && (
                                        <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>
                                )}
                            </button>
                        </div>
                </div>
            </div>
            {filteredBudgets.length === 0 ? 
                <p>No s'han trobat resultats</p> : 
                <ul>
                    {filteredBudgets.map(budget => (
                        <li key={budget.id}><BudgetCard budget={budget}/></li>
                    ))}
                </ul>
            }
        </section>
    )
}