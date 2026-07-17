import { useState } from "react";
import type { Budget } from '../types/budget.types'

export default function useSearchFilter(budgets: Budget[]){

    const [searchTerm, setSearchTerm] = useState('')

    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');

    function handleSortFilter(field: string){ 
        if(field === sortField){ 
        setSortDirection(sortDirection === "desc" ? "asc" : "desc") 
        } else { 
        setSortField(field) 
        setSortDirection("desc") 
        }};

    const sortedBudgets = [...budgets].sort((a, b) => {
        if (sortField === "date") { 
        return sortDirection === "asc" 
        ? new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime() 
        : new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(); 
        } else if (sortField === "amount") { 
        return sortDirection === "asc" 
        ? a.totalPrice - b.totalPrice 
        : b.totalPrice - a.totalPrice 
        } else if(sortField === "name"){ 
        return sortDirection === "asc" 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
        } else{
            return 0;
        }});

    const filteredBudgets = sortedBudgets.filter((budget) => budget.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return {searchTerm, sortDirection, sortField, filteredBudgets, handleSortFilter, setSearchTerm}
}