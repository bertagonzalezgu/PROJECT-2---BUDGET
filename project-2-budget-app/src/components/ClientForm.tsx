import { useForm } from 'react-hook-form'
import arrowRight from '../assets/icons/keyboard_arrow_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import type { FormInputs } from '../types/form.types'

export default function ClientForm(){

    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>()

    const onSubmit = handleSubmit((data) => {
            console.log(data)
        })

    return (
        <section>
            <div>
                <h1>Demanar pressupost</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name"></label>
                    <input 
                    type="text" 
                    placeholder='Nom' 
                    {...register("name", 
                    {required: true})}/>
                    {errors.name && <span>*Aquest camp és obligatori</span>}

                    <label htmlFor="surname"></label>
                    <input type="text" placeholder='Cognoms' {...register("surname", {required: true})}/>
                    {errors.surname && <span>*Aquest camp és obligatori</span>}

                    <label htmlFor="tel"></label>
                    <input type="number" placeholder='Telèfon' {...register("tel", {required: true})}/>
                    {errors.tel && <span>*Aquest camp és obligatori</span>}

                    <label htmlFor="email"></label>
                    <input type="email" 
                    placeholder='Email' 
                    {...register("email", {
                    required: "Aquest camp és obligatori",
                    pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "El format del correu no és vàlid"
                        }
                        })}
                    />
                    {errors.email?.message && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <button type='submit'>
                        Sol·licitar pressupost
                        <img src={arrowRight} alt="Flecha apuntando a la derecha" />
                    </button>
                </div>
            </form>
        </section>
        
    )

}