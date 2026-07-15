import type { WebConfig, Service } from '../types/service.types'
import { useState } from 'react'
import calculatePrice from '../services/priceCalculator'

export default function useBudgetCalculator(services: Service[]){

    const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set());
        
    const [webConfig, setWebConfig] = useState<WebConfig>({pages:1, languages: 1})
    
    function toggleService(id:number){
        setSelectedServices(prevSelectedServices => {
            const actualized = new Set(prevSelectedServices);

            if(actualized.has(id)){
                actualized.delete(id)
            } else {
                actualized.add(id)
            }
            return actualized;
        });
    };

    function pagesCounter(value: number){
        if(value >= 1){
            setWebConfig({...webConfig, pages: value})
        }
    };

    function languagesCounter(value: number){
        if(value >= 1){
            setWebConfig({...webConfig, languages: value})
        }
    };

    const totalPriceServicesSelected = calculatePrice(services, selectedServices, webConfig)

    function resetSelection(){
        setSelectedServices(new Set());
        setWebConfig({pages: 1, languages: 1})
    }

    return {
        selectedServices, webConfig, toggleService, pagesCounter, languagesCounter, totalPriceServicesSelected, resetSelection
    }
}