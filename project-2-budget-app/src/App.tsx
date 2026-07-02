import DataServices from './data/services.json'
import ServiceCard from './components/ServiceCard'
import type { Service } from './types/service.types'

export default function App(){
    const servicesCardsList = DataServices.services.map((element: Service) => 
    <ServiceCard key={element.title} serviceData={element} />)
    
    return (
        <ul>
            {servicesCardsList}  
        </ul> 
    );
};