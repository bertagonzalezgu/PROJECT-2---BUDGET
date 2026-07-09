import { useForm } from 'react-hook-form'
import arrowRight from '../assets/icons/keyboard_arrow_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import type { FormInputs } from '../types/form.types'

export default function ClientForm(){

    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>()

    const onSubmit = handleSubmit((data) => {
            console.log(data)
        })

    return (
        <section className="container rounded-3xl shadow-md p-8 my-5 gap-5 border flex flex-col max-w-3xl mx-auto transition-all duration-200 bg-white border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Demanar pressupost</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className='flex justify-between'>
                    <input className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm"
                    type="text" 
                    placeholder='Nom i cognoms' 
                    {...register("name", 
                    {required: true})}/>
                    {errors.name && <span>*Aquest camp és obligatori</span>}

                    <input className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm" type="number" placeholder='Telèfon' 
                    {...register("tel", 
                    {required: true})}/>
                    {errors.tel && <span>*Aquest camp és obligatori</span>}

                    <input className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm" type="email" 
                    placeholder='Email' 
                    {...register("email", 
                    {required: "Aquest camp és obligatori",
                    pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "El format del correu no és vàlid"
                        }
                        })}
                    />
                    {errors.email?.message && <span>{errors.email.message}</span>}
                </div>
                <br />
                <div className='flex justify-end'>
                    <button className="flex items-center gap-3 bg-linear-to-bl from-slate-800 to-blue-500 px-3 py-1.5 rounded-xl border border-blue-800 text-white shadow-sm cursor-pointer" type='submit'>
                        Sol·licitar pressupost
                        <img src={arrowRight} alt="Flecha apuntando a la derecha" />
                    </button>
                </div>
            </form>
        </section>
        
    )

}