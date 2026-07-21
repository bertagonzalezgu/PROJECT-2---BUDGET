import { useForm } from 'react-hook-form'
import arrowRight from '../assets/icons/keyboard_arrow_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import type { FormInputs, ClientFormProps} from '../types/form.types'

export default function ClientForm({onClientSubmit}: ClientFormProps){

    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>()

    const onSubmit = handleSubmit((data) => {
            onClientSubmit(data)
        })

    return (
        <section className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border flex flex-col transition-all duration-200 bg-white border-gray-100 shadow-sm">
            <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Demanar pressupost</h2>
            </div>
            <form className="flex flex-col gap-4 sm:gap-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <input className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text" 
                        placeholder='Nom i cognoms' 
                        {...register("name", 
                        {required: true})}/>
                        {errors.name && <span className="text-xs text-red-500 font-medium">*Aquest camp és obligatori</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <input className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm" type="number" placeholder='Telèfon' 
                        {...register("tel", 
                        {required: true})}/>
                        {errors.tel && <span className="text-xs text-red-500 font-medium">*Aquest camp és obligatori</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <input className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" 
                        placeholder='Email' 
                        {...register("email", 
                        {required: "Aquest camp és obligatori",
                        pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "El format del correu no és vàlid"
                            }
                            })}
                        />
                        {errors.email?.message && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
                    </div>
                </div>
                <div className='flex justify-end pt-2'>
                    <button className="flex items-center bg-linear-to-bl from-slate-800 to-blue-500 border border-blue-800 w-full sm:w-auto justify-center gap-2  hover:from-slate-900 hover:to-blue-700 active:scale-95 transition-all px-5 py-2.5 rounded-xl text-white font-medium text-sm shadow-md cursor-pointer" type='submit'>
                        Sol·licitar pressupost
                        <img src={arrowRight} alt="Flecha apuntando a la derecha" className="w-5 h-5"/>
                    </button>
                </div>
            </form>
        </section>
    )
}