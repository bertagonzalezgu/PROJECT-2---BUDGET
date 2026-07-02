import type {Service} from "../types/service.types";

export default function ServiceCard(service: Service){
    return( 
        <section>
            <div>
                <h1>{service.title}</h1>  
                <p>{service.description}</p>
            </div>   
                <span>{service.price}</span>  
        </section>
          
    );
}