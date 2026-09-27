import type {ServiceCardProps} from "../types/service.types";


export default function ServiceCard({serviceData, isServiceSelected, onToggle}: ServiceCardProps){
    return( 
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 sm:gap-6">
            <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">{serviceData.title}</h2>  
                <p className="text-xs sm:text-sm text-gray-500 font-normal leading-snug sm:max-w-xs tracking-wide">{serviceData.description}</p>
            </div>   
            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight tabular-nums">{serviceData.price}
                <span className="text-xl sm:text-2xl font-bold ml-1">€</span></span>

                <button
                    type="button"
                    role="checkbox"
                    aria-checked={isServiceSelected}
                    onClick={() => onToggle(serviceData.id)}
                    className={`inline-flex items-center justify-center gap-1.5 min-w-28 px-4 py-2 rounded-xl border text-sm font-semibold select-none cursor-pointer transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                        isServiceSelected
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                            : "bg-white border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600"
                    }`}
                >
                    {isServiceSelected ? "Añadido" : "Añadir"}
                    {isServiceSelected && <span aria-hidden="true">✓</span>}
                    <span className="sr-only"> servicio {serviceData.title}</span>
                </button>
            </div>
        </div>          
    );
}
