import { useState } from "react";
import type { Budget } from '../types/budget.types'

export type SortField = 'date' | 'amount' | 'name';
export type SortDirection = 'asc' | 'desc';

interface UseSearchFilterResult {
    searchTerm: string;
    sortField: SortField;
    sortDirection: SortDirection;
    filteredBudgets: Budget[];
    handleSortFilter: (field: SortField) => void;
    setSearchTerm: (term: string) => void;
}

export default function useSearchFilter(budgets: Budget[]): UseSearchFilterResult{

    const [searchTerm, setSearchTerm] = useState('')

    const [sortField, setSortField] = useState<SortField>('date');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    function handleSortFilter(field: SortField){ 
        if(field === sortField){ 
        setSortDirection(sortDirection === "desc" ? "asc" : "desc") 
        } else { 
        setSortField(field) 
        setSortDirection("desc") 
        }};

    const sortedBudgets = [...budgets].sort((a, b) => {
        switch (sortField) {
            case "date":
                return sortDirection === "asc" 
                ? new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime() 
                : new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(); 
            case "amount":
                return sortDirection === "asc" 
                ? a.totalPrice - b.totalPrice 
                : b.totalPrice - a.totalPrice 
            case "name":
                return sortDirection === "asc" 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        }});

    const filteredBudgets = sortedBudgets.filter((budget) => budget.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return {searchTerm, sortDirection, sortField, filteredBudgets, handleSortFilter, setSearchTerm}
}
