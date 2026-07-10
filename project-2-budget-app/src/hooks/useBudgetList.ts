import type { Budget } from "../types/budget.types";
import { useState } from "react";

export default function useBudgetList(){
    
    const [budgets, setBudgets] = useState<Budget[]>([]);

    function addBudgetToList(newBudget: Budget){
    
        setBudgets(prevBudgets => [...prevBudgets, newBudget]);
        };

        return {budgets, addBudgetToList}
};
    
