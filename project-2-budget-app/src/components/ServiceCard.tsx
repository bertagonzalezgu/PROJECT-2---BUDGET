import type {ServiceCardProps} from "../types/service.types";


export default function ServiceCard({serviceData, isServiceSelected, onToggle}: ServiceCardProps){
    return( 
        <div className="flex items-center justify-between w-3xl">
            <div className="flex-1 pr-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{serviceData.title}</h1>  
                <p className="text-sm text-gray-500 font-normal leading-snug max-w-xs tracking-wide">{serviceData.description}</p>
            </div>   
            <div className="flex-1 text-center">
                <span className="text-3xl font-extrabold text-gray-800">{serviceData.price}
                <span className="text-xl font-bold ml-1">€</span></span>
            </div>
                 
                <div className="flex items-center justify-end gap-3 flex-1">
                    <label htmlFor={`add-service-${serviceData.title}`}
                    className="text-sm font-semibold text-gray-700 cursor-pointer select-none">Afegir</label>
                    <input 
                    type="checkbox" 
                    checked= {isServiceSelected}
                    onChange={() => onToggle(serviceData.id)}
                    id={`add-service-${serviceData.title}`} aria-label={`Afegir servei ${serviceData.title}`}
                    className="w-5 h-5 rounded cursor-pointer"/>
                </div> 
        </div>          
    );
}