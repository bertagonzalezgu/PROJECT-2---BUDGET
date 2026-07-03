import DataServices from './data/services.json'
import ServiceCard from './components/ServiceCard'
import type { Service } from './types/service.types'
import bgHeader from './assets/img/bg-header.jpg'

export default function App(){
    const servicesCardsList = DataServices.services.map((element: Service) => 
    <ServiceCard key={element.title} serviceData={element} />)
    
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
        </main>
        </>      
    );
};