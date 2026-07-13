import BudgetCard from "./BudgetCard";
import type { Budget } from '../types/budget.types'

interface BudgetListProps{
    budgets: Budget[]
}

export default function BudgetList({budgets}: BudgetListProps){
    return(
        <ul>
            {budgets.map(budget => (
                <li key={budget.id}><BudgetCard budget={budget}/></li>
            ))}
        </ul>
    )
}