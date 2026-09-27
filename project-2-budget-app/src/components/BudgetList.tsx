import BudgetCard from "./BudgetCard";
import type { Budget } from '../types/budget.types'
import useSearchFilter, { type SortField } from "../hooks/useSearchFilter";
interface BudgetListProps{
    budgets: Budget[]
}

const sortOptions: { field: SortField; label: string }[] = [
    { field: "date", label: "Fecha" },
    { field: "amount", label: "Importe" },
    { field: "name", label: "Nombre" },
];

export default function BudgetList({budgets}: BudgetListProps){

    const {searchTerm, sortField, sortDirection, filteredBudgets, handleSortFilter, setSearchTerm} = useSearchFilter(budgets);

    if(budgets.length === 0){
        return (
            <section className="w-full flex flex-col items-center text-center py-10 sm:py-14 px-4 rounded-2xl sm:rounded-3xl border border-dashed border-gray-200 bg-white">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-indigo-50 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
                        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
                        <path d="M14 3v5h5"/>
                        <path d="M9 13h6"/>
                        <path d="M9 17h4"/>
                    </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Aún no tienes presupuestos</h2>
                <p className="text-sm text-gray-500 font-medium max-w-sm">Selecciona los servicios que necesitas y genera tu primer presupuesto</p>
            </section>
        )
    }

    const getSortBtn = (field: SortField) => {
        const isActive = sortField === field;
            return `cursor-pointer transition-all duration-200 flex items-center gap-1 select-none text-xs sm:text-sm rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
            isActive ? "text-indigo-600 font-bold scale-105" : "text-gray-500 font-medium hover:text-gray-900"}`
        };

    return(
        <section className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Presupuestos en curso:
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." aria-label="Buscar presupuesto por nombre" className="w-full sm:w-48 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"/>
                        <div className="flex gap-3 sm:gap-4">
                            {sortOptions.map(({ field, label }) => (
                                <button key={field} type="button" onClick={() => handleSortFilter(field)} className={getSortBtn(field)}>
                                    {label} {sortField === field && (
                                            <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                </div>
            </div>
            {filteredBudgets.length === 0 ? 
                <p className="text-gray-500 font-medium text-center sm:text-left py-4">No se han encontrado resultados</p> : 
                <ul>
                    {filteredBudgets.map(budget => (
                        <li key={budget.id}><BudgetCard budget={budget}/></li>
                    ))}
                </ul>
            }
        </section>
    )
}
