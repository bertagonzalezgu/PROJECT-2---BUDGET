import { useForm } from 'react-hook-form'
import arrowRight from '../assets/icons/keyboard_arrow_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import type { FormInputs, ClientFormProps} from '../types/form.types'

// At least 9 digits, optionally separated by spaces or hyphens, with an optional leading "+"
const PHONE_PATTERN = /^\+?(?:[\s-]*\d){9,}[\s-]*$/

const inputClassName = "w-full bg-white px-3.5 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"

export default function ClientForm({onClientSubmit}: ClientFormProps){

    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>()

    const onSubmit = handleSubmit((data) => {
            onClientSubmit(data)
        })

    return (
        <section className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border flex flex-col transition-all duration-200 bg-white border-gray-100 shadow-sm">
            <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Solicitar presupuesto</h2>
            </div>
            <form className="flex flex-col gap-4 sm:gap-6" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <input className={inputClassName}
                        type="text" 
                        placeholder='Nombre y apellidos' 
                        aria-label='Nombre y apellidos'
                        aria-invalid={errors.name ? true : false}
                        {...register("name", 
                        {required: "Este campo es obligatorio"})}/>
                        {errors.name?.message && <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <input className={inputClassName}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder='Teléfono' 
                        aria-label='Teléfono'
                        aria-invalid={errors.tel ? true : false}
                        {...register("tel", 
                        {required: "Este campo es obligatorio",
                        pattern: {
                                value: PHONE_PATTERN,
                                message: "Introduce un teléfono válido (mínimo 9 dígitos)"
                            }
                        })}/>
                        {errors.tel?.message && <span className="text-xs text-red-500 font-medium">{errors.tel.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <input className={inputClassName}
                        type="email" 
                        placeholder='Email' 
                        aria-label='Email'
                        autoComplete="email"
                        aria-invalid={errors.email ? true : false}
                        {...register("email", 
                        {required: "Este campo es obligatorio",
                        pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "El formato del correo no es válido"
                            }
                            })}
                        />
                        {errors.email?.message && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
                    </div>
                </div>
                <div className='flex justify-end pt-2'>
                    <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto justify-center gap-2 active:scale-95 transition-all px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2" type='submit'>
                        Solicitar presupuesto
                        <img src={arrowRight} alt="" aria-hidden="true" className="w-5 h-5"/>
                    </button>
                </div>
            </form>
        </section>
    )
}
