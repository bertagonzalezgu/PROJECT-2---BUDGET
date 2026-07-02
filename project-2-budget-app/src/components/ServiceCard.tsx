import type {ServiceCardProps} from "../types/service.types";

export default function ServiceCard({serviceData}: ServiceCardProps){
    return( 
        <li>
            <div>
                <h1>{serviceData.title}</h1>  
                <p>{serviceData.description}</p>
            </div>   
                <span>{serviceData.price}€</span> 
                <div>
                    <label htmlFor={`add-service-${serviceData.title}`}>Afegir</label>
                    <input type="checkbox" id={`add-service-${serviceData.title}`} aria-label={`Afegir servei ${serviceData.title}`}/>
                </div> 
        </li>          
    );
}