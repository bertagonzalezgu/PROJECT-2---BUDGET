import BudgetCard from "./BudgetCard";
import type { Budget } from '../types/budget.types'

interface BudgetListProps{
    budgets: Budget[]
}

export default function BudgetList({budgets}: BudgetListProps){

    const sortedBudgets = [...budgets].sort((a, b) => 
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    )

    if(budgets.length === 0){
        return <p>No tens cap pressupost en curs.</p>
    }

    return(
        <ul>
            {sortedBudgets.map(budget => (
                <li key={budget.id}><BudgetCard budget={budget}/></li>
            ))}
        </ul>
    )
}