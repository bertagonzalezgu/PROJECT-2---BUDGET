import type { ModalCardProps } from "../types/modal.types";
import closeIcon from '../assets/icons/close_24dp_1E2939_FILL0_wght400_GRAD0_opsz24.svg'

export function ModalCard({content, isOpen, onClose}: ModalCardProps){

    return(
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}>
                <section className="relative w-full max-w-sm p-6 pr-10 text-black bg-white/70 rounded-2xl border-blue-600 border shadow-xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-content">
                    <button className="absolute top-4 right-4 text-black hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={onClose}>
                        <img className="w-6 h-6 stroke-gray-800" src={closeIcon} alt="Cerrar" />
                    </button>
                    <div className="mb-2">
                        <h3 className="text-base font-semibold tracking-wide text-gray-950" id="modal-content">{content.title}</h3>
                    </div>
                    <hr className="border-t border-blue-600 my-3 w-40" />
                    <div>
                        <p>{content.description}</p>
                    </div> 
                </section> 
            </div>
           
        )
    );
}