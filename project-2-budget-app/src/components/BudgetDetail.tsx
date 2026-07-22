import DataServices from '../data/services.json'
import type { Budget } from '../types/budget.types'
import { getServicePrice } from '../services/priceCalculator'
import type { Service } from '../types/service.types'
import { formatDate } from '../utils/formatDate'
import { Link } from 'react-router-dom'
import arrowLeft from '../assets/icons/arrow_left_alt_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro'

interface BudgetDetailProps{
    budget: Budget
}

export default function BudgetDetail({budget}: BudgetDetailProps){

    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const confirmedServices = budget.checkedServices.map((name) => DataServices.services.find(service => service.title === name)).filter((service): service is Service => service !== undefined)
    
    const servicesWithPrice = confirmedServices.map((service) => ({name: service.title, price: getServicePrice(service, budget.webConfig)}))

    const refContent = useRef<HTMLDivElement>(null);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
    };

    const handleDownloadPdf = async () => {
        setDownloaded(true)

        const element = refContent.current;
        if (!element) return;

        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imageWidth = 210;
        const imageHeight = (canvas.height * imageWidth) / canvas.width;

        pdf.addImage(imageData, 'PNG', 0, 0, imageWidth, imageHeight);

        const namePdfFile = `pressupost-${budget.name.toLowerCase().replace(' ', '-')}.pdf`;
        pdf.save(namePdfFile);
    };

    return (
        <div className="max-w-3xl mx-auto my-8 p-5 font-[Montserrat]">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <Link to="/" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-sm transition-all font-semibold text-sm cursor-pointer">
                    <img src={arrowLeft} alt="Arrow left" className="w-5 h-5"/>Tornar
                </Link>

                <div className="flex gap-2">
                    <button 
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 border px-4 py-2 rounded-2xl text-sm font-semibold transition-all cursor-pointer" 
                        onClick={handleCopyUrl}
                    >
                        {copied ? "Copiat!" : "Copiar URL"}
                    </button>
                    <button 
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 border px-4 py-2 rounded-2xl text-sm font-semibold transition-all cursor-pointer" 
                        onClick={handleDownloadPdf}
                    >
                        {downloaded ? "Descarregat!" : "Descarregar PDF"}
                    </button>
                </div>
            </div>

            <div ref={refContent} className="bg-white rounded-3xl shadow-md p-8 border border-gray-300 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight py-2">Desglossament del pressupost</h1>
                        <p className="text-sm font-medium text-gray-400">
                            Nº de pressupost: <span className="font-bold text-gray-600">#{budget.id}</span>
                        </p>
                    </div>
                    <div className="bg-blue-50/50 border-blue-200 border px-4 py-2 rounded-2xl self-start sm:self-auto">
                        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider block">Data de creació</span>
                        <span className="text-sm font-bold text-gray-700">{formatDate(budget.creationDate)}</span>
                    </div>
                </div>

                <div className="p-6 rounded-2xl border bg-blue-50/50 border-blue-200">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Dades del Client</h3>
                    <p className="text-lg font-bold text-gray-800">{budget.name}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">{budget.email}</p>
                    <p className="text-sm text-gray-500 font-medium">{budget.tel}</p>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Serveis contractats</h3>
                    <ul className="divide-y divide-blue-200 border-blue-200 border rounded-2xl overflow-hidden p-4">
                        {servicesWithPrice.map((service) => (
                            <li key={service.name} className="flex justify-between items-center p-2 bg-white">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-700">{service.name}</span>
                                    {service.name === "Web" && budget.webConfig && (
                                        <span className="text-xs text-gray-500 font-medium mt-0.5">
                                            ({budget.webConfig.pages} pàgines, {budget.webConfig.languages} idiomes)
                                        </span>
                                    )}
                                </div>
                                <span className="font-bold text-gray-900 text-lg">{service.price}€</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 bg-lineal-to-bl from-white to-blue-50/30 -mx-8 -mb-8 p-8 rounded-b-3xl">
                    <span className="text-xl font-bold text-gray-800">Preu Total</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tight">
                        {budget.totalPrice}€
                    </span>
                </div>
            </div>
        </div>
    )
}