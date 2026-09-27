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
import OnboardingPage from './OnboardingPage'

export default function App(){
    
    const {selectedServices, webConfig, toggleService, pagesCounter, languagesCounter, totalPriceServicesSelected, resetSelection} = useBudgetCalculator(DataServices.services)

    const {budgets, addBudgetToList} = useBudgetList();

    const servicesCardsList = DataServices.services.map((element: Service) => {

        const isServiceSelected = selectedServices.has(element.id)

        return (
            <li key={element.id} className={`rounded-3xl shadow-md p-8 my-5 border flex flex-col max-w-3xl mx-auto transition-all duration-200 ${
                isServiceSelected 
                    ? "bg-indigo-50/50 border-indigo-200" 
                    : "bg-white border-gray-100"
            }`}>
                <div className="flex items-center justify-between w-full">
                    <ServiceCard serviceData={element} isServiceSelected={selectedServices.has(element.id)} onToggle={toggleService}/>
                </div>    
                    {element.title === "Web" && selectedServices.has(element.id) && (
                        <div className="mt-6 pt-6 border-t border-indigo-100 w-full animate-fadeIn">
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

        console.log("Presupuesto generado:", newBudgetCreated);

        addBudgetToList(newBudgetCreated);
        resetSelection()
    }
                                    
    return (
        <Routes>
        <Route path="/" element={<OnboardingPage/>}/>
        <Route path="/servicios" element={
            <div className='min-h-screen py-6 px-4 sm:py-10 sm:px-6 lg:px-8 font-[Montserrat] text-gray-800'>
                <div className="w-full mx-auto space-y-8">
                <header className="relative bg-indigo-600 rounded-2xl sm:rounded-3xl shadow-md px-6 py-12 sm:px-12 sm:py-16 md:py-20 flex flex-col items-center justify-center overflow-hidden text-center">
                    <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10"></div>
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-indigo-400/30"></div>
                    <p className="relative text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100 mb-3">Digitalify Agency</p>
                    <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">Servicios digitales a medida para hacer crecer tu negocio</h1>
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
                        <hr className="mt-6 pt-6 border-t border-indigo-200 w-full"/>
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