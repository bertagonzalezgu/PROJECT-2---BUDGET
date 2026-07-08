import type { ModalCardProps } from "../types/modal.types";
import closeIcon from '../assets/icons/close-svgrepo-com.svg'

export function ModalCard({content, isOpen, onClose}: ModalCardProps){

    return(
        isOpen && (
            <div onClick={onClose}>
                <section onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-content">
                    <div>
                        <h3 id="modal-content">{content.title}</h3>
                    </div>
                    <div>
                        <p>{content.description}</p>
                    </div> 
                    <button onClick={onClose}>
                        <img src={closeIcon} alt="Cerrar" />
                    </button>
                </section> 
            </div>
           
        )
    );
}