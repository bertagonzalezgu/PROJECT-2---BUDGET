import DataServices from './data/services.json'
import ServiceCard from './components/ServiceCard'
import type { WebConfig, Service } from './types/service.types'
import bgHeader from './assets/img/bg-header.jpg'
import { useState } from 'react'
import calculatePrice from './services/priceCalculator'
import PriceCounter from './components/PriceCounter'
import WebConfigurator from './components/WebConfigurator'


export default function App(){
    const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set());

    const servicesCardsList = DataServices.services.map((element: Service) => 
    <ServiceCard key={element.id} serviceData={element} isServiceSelected={selectedServices.has(element.id)} onToggle={toggleService} />)
    
    const webId = DataServices.services.find(element => element.title === "Web")?.id

    const isWebSelected = (undefined !== webId) && selectedServices.has(webId)  

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

    const totalPriceServicesSelected = calculatePrice(DataServices.services, selectedServices, webConfig)

    return (
        <>
        <header className="flex bg-linear-to-bl from-green-300 to-blue-200 rounded-3xl shadow-sm max-w-3xl mx-auto p-24 mb-12 items-center justify-center relative border border-gray-100 overflow-hidden">
            <img src={bgHeader} alt="Background image" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none object-top"/>
            <h1 className="absolute text-3xl font-extrabold text-black justify-center tracking-wide">Aconsegueix la millor qualitat</h1>
        </header>
        <main className="max-w-3xl mx-auto">
           <ul className='list-none p-0 m-0 space-y-6'>
                {servicesCardsList}    
            </ul>
            {isWebSelected && <WebConfigurator webConfig={webConfig} onPagesChange={pagesCounter} onLanguagesChange={languagesCounter}/>}
            <PriceCounter total={totalPriceServicesSelected}/>
        </main>
        </>      
    );
};