export interface ModalContent{
    title: string;
    description: string;
}

export interface ModalCardProps{
    content: ModalContent;
    isOpen: boolean;
    onClose: () => void
}