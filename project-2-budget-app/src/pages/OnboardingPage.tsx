import { Link } from 'react-router-dom'
import DataServices from '../data/services.json'
import arrowRight from '../assets/icons/keyboard_arrow_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'

const highlights = [
    {
        title: "Presupuesto al instante",
        description: "Elige los servicios que necesitas y consulta el precio en tiempo real, sin esperas ni llamadas."
    },
    {
        title: "Soluciones a medida",
        description: "Configura tu web con las páginas e idiomas que tu proyecto necesita. Pagas solo por lo que usas."
    },
    {
        title: "Sin compromiso",
        description: "Guarda tus presupuestos, compártelos con un enlace o descárgalos en PDF cuando quieras."
    }
]

export default function OnboardingPage(){
    return (
        <div className="min-h-screen py-6 px-4 sm:py-10 sm:px-6 lg:px-8 font-[Montserrat] text-gray-800">
            <div className="w-full mx-auto space-y-8">
                <header className="relative bg-indigo-600 rounded-2xl sm:rounded-3xl shadow-md px-6 py-16 sm:px-12 sm:py-24 md:py-28 flex flex-col items-center justify-center overflow-hidden text-center">
                    <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10"></div>
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-indigo-400/30"></div>
                    <p className="relative text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100 mb-4">Digitalify Agency</p>
                    <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">Impulsa tu negocio en el mundo digital</h1>
                    <p className="relative mt-5 text-base sm:text-lg text-indigo-100 max-w-2xl">
                        SEO, publicidad online y desarrollo web en un solo lugar. Diseña el plan que encaja con tu negocio y obtén tu presupuesto en menos de un minuto.
                    </p>
                    <Link to="/servicios" className="relative mt-8 inline-flex items-center bg-white hover:bg-indigo-50 text-indigo-700 px-7 py-3 rounded-2xl shadow-md transition-all font-bold text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600">
                        Empezar mi presupuesto
                    </Link>
                </header>

                <main className="max-w-5xl mx-auto space-y-12 pb-6">
                    <section aria-labelledby="highlights-title">
                        <h2 id="highlights-title" className="sr-only">Por qué Digitalify</h2>
                        <ul className="list-none p-0 m-0 grid gap-6 md:grid-cols-3">
                            {highlights.map((item) => (
                                <li key={item.title} className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="services-title" className="bg-white rounded-3xl shadow-md p-8 sm:p-10 border border-gray-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Nuestros servicios</p>
                        <h2 id="services-title" className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">Todo lo que necesitas para crecer online</h2>
                        <ul className="list-none p-0 m-0 mt-8 grid gap-4 sm:grid-cols-3">
                            {DataServices.services.map((service) => (
                                <li key={service.id} className="rounded-2xl border bg-indigo-50/50 border-indigo-200 p-6">
                                    <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500 font-medium">{service.description}</p>
                                    <p className="mt-4 text-sm text-gray-500">Desde <span className="text-lg font-bold text-indigo-700">{service.price}€</span></p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-gray-100">
                            <p className="text-base font-semibold text-gray-700">¿Listo para dar el salto? Tu presupuesto personalizado te espera.</p>
                            <Link to="/servicios" className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-sm transition-all font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2">
                                Descubrir servicios
                                <img src={arrowRight} alt="" aria-hidden="true" className="w-5 h-5"/>
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
