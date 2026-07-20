import { useParams } from "react-router-dom";
import type { Budget } from "../types/budget.types";
import BudgetDetail from "../pages/BudgetDetailPage";

interface BudgetDetailWrapperProps {
    budgets: Budget[];
}

export default function BudgetDetailWrapper({ budgets }: BudgetDetailWrapperProps) {
    const { id } = useParams<{ id: string }>();
    const budget = budgets.find(b => b.id === id);

    if (!budget) return <p>Pressupost no trobat</p>;

    return <BudgetDetail budget={budget} />;
}