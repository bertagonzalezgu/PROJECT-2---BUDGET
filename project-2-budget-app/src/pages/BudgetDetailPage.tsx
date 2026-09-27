import { useSearchParams } from "react-router-dom";
import type { Budget } from "../types/budget.types";
import BudgetDetail from "../components/BudgetDetail";

interface BudgetDetailPageProps {
    budgets: Budget[];
}

export default function BudgetDetailPage({ budgets }: BudgetDetailPageProps) {
    const [searchParams] = useSearchParams();
    const budgetId = searchParams.get("id")
    const budget = budgets.find(b => b.id === budgetId);

    if(!budget){
        return <p>No se ha encontrado ningún presupuesto con este identificador.</p>;
    }
    
    return <BudgetDetail budget={budget} />;
}