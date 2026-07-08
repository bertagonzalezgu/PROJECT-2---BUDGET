import type {PriceCounterProps} from '../types/budget.types';

export default function PriceCounter({total}:PriceCounterProps){

    return( 
        <section className="bg-white rounded-3xl shadow-md p-8 my-5 border border-gray-100 flex justify-between max-w-xs mr-0 ml-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Preu total: </h2>  
            <span className="text-3xl font-extrabold text-gray-800" aria-live='polite'>{total}€</span>
        </section>          
    );
};