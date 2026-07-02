import type {Service} from "../types/service.types";

export default function ServiceCard(service: Service){
    return( 
        <li>
            <div>
                <h1>{service.title}</h1>  
                <p>{service.description}</p>
            </div>   
                <span>{service.price}€</span> 
                <div>
                    <label htmlFor={`add-service-${service.title}`}>Afegir</label>
                    <input type="checkbox" id={`add-service-${service.title}`} aria-label={`Afegir servei ${service.title}`}/>
                </div> 
        </li>          
    );
}