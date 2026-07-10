import DataServices from '../data/services.json'
import ServiceCard from '../components/ServiceCard'
import type { WebConfig, Service } from '../types/service.types'
import { useState } from 'react'
import calculatePrice from '../services/priceCalculator'
import PriceCounter from '../components/PriceCounter'
import WebConfigurator from '../components/WebConfigurator'
import ClientForm from '../components/ClientForm'
import type { FormInputs } from '../types/form.types'
import budgetGenerator from '../services/idGenerator'
import useBudgetList from '../hooks/useBudgetList'

export default function App(){
    const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set());
    
    const [webConfig, setWebConfig] = useState<WebConfig>({pages:1, languages: 1})

    const {budgets, addBudgetToList} = useBudgetList();

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

    const servicesCardsList = DataServices.services.map((element: Service) => {

        const isServiceSelected = selectedServices.has(element.id)

        return (
            <li key={element.id} className={`rounded-3xl shadow-md p-8 my-5 border flex flex-col max-w-3xl mx-auto transition-all duration-200 ${
                isServiceSelected 
                    ? "bg-blue-50/50 border-blue-200" 
                    : "bg-white border-gray-100"
            }`}>
                <div className="flex items-center justify-between w-full">
                    <ServiceCard serviceData={element} isServiceSelected={selectedServices.has(element.id)} onToggle={toggleService}/>
                </div>    
                    {element.title === "Web" && selectedServices.has(element.id) && (
                        <div className="mt-6 pt-6 border-t border-blue-100 w-full animate-fadeIn">
                            <WebConfigurator webConfig={webConfig} onPagesChange={pagesCounter} onLanguagesChange={languagesCounter}/>
                        </div>
                    )}
            </li>
        )
    });
    
    const totalPriceServicesSelected = calculatePrice(DataServices.services, selectedServices, webConfig)
    
    const webId = DataServices.services.find(element => element.title === "Web")?.id
    const isWebSelected = (undefined !== webId) && selectedServices.has(webId)  

    function handleClientSubmit(dataFormInputs: FormInputs){
        const selectedServicesNames: string[] =  DataServices.services
                                            .filter(service => selectedServices.has(service.id))
                                            .map(service => service.title);
        
        const saveWebConfig = isWebSelected? webConfig : undefined;
        const newBudgetCreated = budgetGenerator(dataFormInputs, selectedServicesNames, totalPriceServicesSelected, saveWebConfig);

        console.log("Pressupost generat:", newBudgetCreated);

        addBudgetToList(newBudgetCreated);

        setSelectedServices(new Set());
        setWebConfig({pages: 1, languages: 1})
    }
                                    
    return (
        <div className='m-5'>
        <header className="flex bg-linear-to-bl from-white to-blue-200 rounded-3xl shadow-sm max-w-3xl mx-auto p-24 mb-12 items-center justify-center relative border border-gray-100 overflow-hidden">
            <h1 className="absolute text-3xl font-extrabold text-black justify-center tracking-wide">Aconsegueix la millor qualitat</h1>
        </header>
        <main className="max-w-3xl mx-auto">
           <ul className='list-none p-0 m-0 space-y-6'>
                {servicesCardsList}    
            </ul>
                {selectedServices.size > 0 && (
                    <div>
                        <ClientForm onClientSubmit={handleClientSubmit}/>
                    </div>
                )}
            <PriceCounter total={totalPriceServicesSelected}/>
        </main>
        </div>      
    );
};