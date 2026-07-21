import DataServices from '../data/services.json'
import ServiceCard from '../components/ServiceCard'
import type { Service } from '../types/service.types'
import PriceCounter from '../components/PriceCounter'
import WebConfigurator from '../components/WebConfigurator'
import ClientForm from '../components/ClientForm'
import type { FormInputs } from '../types/form.types'
import budgetGenerator from '../services/idGenerator'
import useBudgetList from '../hooks/useBudgetList'
import BudgetList from '../components/BudgetList'
import useBudgetCalculator from '../hooks/useBudgetCalculator'
import { Routes, Route } from "react-router-dom"
import BudgetDetailPage from './BudgetDetailPage'

export default function App(){
    
    const {selectedServices, webConfig, toggleService, pagesCounter, languagesCounter, totalPriceServicesSelected, resetSelection} = useBudgetCalculator(DataServices.services)

    const {budgets, addBudgetToList} = useBudgetList();

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
        resetSelection()
    }
                                    
    return (
        <Routes>
        <Route path="/" element={
            <div className='min-h-screen bg-gray-50/50 py-6 px-4 sm:py-10 sm:px-6 lg:px-8 font-[Montserrat] text-gray-800'>
                <div className="w-full mx-auto space-y-8">
                <header className="relative bg-linear-to-bl from-white to-blue-200 rounded-2xl sm:rounded-3xl shadow-sm p-8 sm:p-12 md:p-16 flex items-center justify-center border border-gray-100 overflow-hidden text-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-wide">Aconsegueix la millor qualitat</h1>
                </header>
                <main className="max-w-3xl mx-auto">
                    <ul className='list-none p-0 m-0 space-y-6'>
                        {servicesCardsList}    
                    </ul>
                    <PriceCounter total={totalPriceServicesSelected}/>
                        {selectedServices.size > 0 && (
                                <div>
                                    <ClientForm onClientSubmit={handleClientSubmit}/>
                                </div>
                        )}
                        <hr className="mt-6 pt-6 border-t border-blue-200 w-fill"/>
                        <div>
                            <BudgetList budgets={budgets}/>
                        </div>
                </main>
                </div>
            </div>
        } />
        <Route path="/budget" element={<BudgetDetailPage budgets={budgets}/>}/>
        </Routes>             
    );
};