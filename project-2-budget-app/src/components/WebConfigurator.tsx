import type { WebConfiguratorProps } from "../types/service.types";
import add from '../assets/icons/add_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import subtract from '../assets/icons/remove_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'

export default function WebConfigurator({webConfig, onLanguagesChange, onPagesChange}: WebConfiguratorProps){

    return (
        <section className="bg-white rounded-3xl shadow-md p-8 my-5 border border-gray-100 flex justify-between max-w-xs mr-0 ml-auto">
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">Nombre de pàgines: </h3>
                <button onClick={() => onPagesChange(webConfig.pages -1)} aria-label= {`Menys pàgines ${webConfig.pages}`}>
                    <img src={subtract} alt="Subtract icon"/>
                </button>                  
                <span className="text-3xl font-extrabold text-gray-800" aria-live='polite'>{webConfig.pages}</span> 
                <button onClick={() => onPagesChange(webConfig.pages +1)} aria-label={`Més pàgines ${webConfig.pages}`}>
                    <img src={add} alt="Add icon"/>  
                </button>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">Nombre d'idiomes: </h3> 
                <button onClick={() => onLanguagesChange(webConfig.languages -1)} aria-label={`Menys idiomes ${webConfig.languages}`}>
                    <img src={subtract}  alt="Subtract icon"/> 
                </button>
                <span className="text-3xl font-extrabold text-gray-800" aria-live='polite'>{webConfig.languages}</span>   
                <button onClick={() => onLanguagesChange(webConfig.languages +1)} aria-label={`Més idiomes ${webConfig.languages}`}>
                    <img src={add} alt="Add icon"/>
                </button>
            </div>
        </section> 
    );
};