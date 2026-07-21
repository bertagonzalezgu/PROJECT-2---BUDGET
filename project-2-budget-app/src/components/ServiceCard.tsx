import type {ServiceCardProps} from "../types/service.types";


export default function ServiceCard({serviceData, isServiceSelected, onToggle}: ServiceCardProps){
    return( 
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 sm:gap-6">
            <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{serviceData.title}</h2>  
                <p className="text-xs sm:text-sm text-gray-500 font-normal leading-snug sm:max-w-xs tracking-wide">{serviceData.description}</p>
            </div>   
            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 flex-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-800">{serviceData.price}
                <span className="text-lg sm:text-xl font-bold ml-1">€</span></span>
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