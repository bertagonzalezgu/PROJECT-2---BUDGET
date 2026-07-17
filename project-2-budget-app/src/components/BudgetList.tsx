import BudgetCard from "./BudgetCard";
import type { Budget } from '../types/budget.types'
import useSearchFilter from "../hooks/useSearchFilter";
interface BudgetListProps{
    budgets: Budget[]
}

export default function BudgetList({budgets}: BudgetListProps){

    const {searchTerm, filteredBudgets, handleSortFilter, setSearchTerm} = useSearchFilter(budgets);

    if(budgets.length === 0){
        return <p>No tens cap pressupost en curs.</p>
    }

    return(
        <>
            <div className="max-w-3xl mx-auto">
                        <div className="flex flex-row justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Pressupostos en curs:
                                </h1>
                            </div>
                            <div className="flex flex-row gap-5 items-center">
                                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." className="bg-white px-3 py-1 rounded-xl border border-gray-200 shadow-sm text-sm focus:outline-none focus:border-gray-400"/>
                                <ul className="flex flex-row gap-4 text-sm font-medium text-gray-600">
                                    <li onClick={() => handleSortFilter("date")} className="cursor-pointer hover:text-gray-90 transition-colors">Data</li>
                                    <li onClick={() => handleSortFilter("amount")} className="cursor-pointer text-gray-900 font-bold flex items-center gap-1">Import
                                        <span className="text-xs">▽</span>
                                    </li>
                                    <li onClick={() => handleSortFilter("name")} className="cursor-pointer hover:text-gray-90 transition-colors">Nom</li>
                                </ul>
                            </div>
                        </div>
                        {filteredBudgets.length === 0 ? <p>No s'han trobat resultats</p> :
                        <ul>
                            {filteredBudgets.map(budget => (
                                <li key={budget.id}><BudgetCard budget={budget}/></li>
                            ))}
                        </ul>}
                    </div>
        </>
    )
}