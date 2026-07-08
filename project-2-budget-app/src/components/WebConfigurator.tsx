import type { WebConfiguratorProps } from "../types/service.types";
import add from '../assets/icons/add_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import subtract from '../assets/icons/remove_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import info from '../assets/icons/info_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.svg'
import ModalContentData from '../data/modal.json'
import { useRef, useState } from "react";
import { ModalCard } from "./ModalCard";

export default function WebConfigurator({webConfig, onLanguagesChange, onPagesChange}: WebConfiguratorProps){

    const [currentModal, setCurrentModal] = useState<"pages" | "languages" | null>(null);
    const lastBtnRef = useRef<HTMLButtonElement>(null);

    const handleClose = () => {
        setCurrentModal(null);
        lastBtnRef.current?.focus();
    }

    const [currentModal, setCurrentModal] = useState<"pages" | "languages" | null>(null);
    const lastBtnRef = useRef<HTMLButtonElement>(null);

    const handleClose = () => {
        setCurrentModal(null);
        lastBtnRef.current?.focus();
    }

    return (
        <section className="flex flex-row flex-wrap items-center justify-end gap-8 w-full">
            <div className="flex items-center gap-4">
                <button className="cursor-pointer" onClick={(e) => {
                    lastBtnRef.current = e.currentTarget;
                    setCurrentModal("pages");
                    }}>
                    <img src={info} alt="Icono de información"/>
                </button>
                <div>
                    <h3 className="text-base font-medium tracking-wider text-gray-700">Nombre de pàgines: </h3>
                    <button onClick={(e) => {
                        lastBtnRef.current = e.currentTarget;
                        setCurrentModal("pages");
                        }}>
                        <img src={info} alt="Icono de información"/>
                    </button>
                </div>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
                    <button onClick={() => onPagesChange(webConfig.pages -1)} aria-label= {`Menys pàgines ${webConfig.pages}`}>
                        <img src={subtract} alt="Subtract icon" className="w-4 h-4"/>
                    </button>                  
                    <span className="text-base font-semibold text-center text-gray-800 w-6 tabular-nums" aria-live='polite'>{webConfig.pages}</span> 
                    <button onClick={() => onPagesChange(webConfig.pages +1)} aria-label={`Més pàgines ${webConfig.pages}`}>
                        <img src={add} alt="Add icon" className="w-4 h-4"/>  
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="cursor-pointer" onClick={(e) => {
                    lastBtnRef.current = e.currentTarget;
                    setCurrentModal("languages");
                    }}>
                    <img src={info} alt="Icono de información"/>
                </button>
                <div>
                    <h3 className="text-base font-medium tracking-wider text-gray-700">Nombre d'idiomes: </h3>
                    <button onClick={(e) => {
                        lastBtnRef.current = e.currentTarget;
                        setCurrentModal("languages");
                        }}>
                        <img src={info} alt="Icono de información"/>
                    </button>
                </div>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
                    <button onClick={() => onLanguagesChange(webConfig.languages -1)} aria-label={`Menys idiomes ${webConfig.languages}`}>
                        <img src={subtract}  alt="Subtract icon" className="w-4 h-4"/> 
                    </button>
                    <span className="text-base font-semibold text-center text-gray-800 w-6 tabular-nums" aria-live='polite'>{webConfig.languages}</span>   
                    <button onClick={() => onLanguagesChange(webConfig.languages +1)} aria-label={`Més idiomes ${webConfig.languages}`}>
                        <img src={add} alt="Add icon" className="w-4 h-4"/>
                    </button>
                </div>
            </div>
            <ModalCard content={currentModal? ModalContentData[currentModal] : {title: "", description: ""}} isOpen={currentModal !== null} onClose={handleClose}/>
        </section> 
    );
};