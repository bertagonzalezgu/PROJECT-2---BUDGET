import type { Budget } from "../types/budget.types";
import { useState, useEffect } from "react";

export default function useBudgetList(){
    
    const [budgets, setBudgets] = useState<Budget[]>(() => {
    const stored = localStorage.getItem("budgets")
    return stored ? JSON.parse(stored) : []
    });

    useEffect(() => {localStorage.setItem("budgets", JSON.stringify(budgets))}, [budgets]);

    function addBudgetToList(newBudget: Budget){
    
        setBudgets(prevBudgets => [...prevBudgets, newBudget]);
        };

        return {budgets, addBudgetToList}
};
    
