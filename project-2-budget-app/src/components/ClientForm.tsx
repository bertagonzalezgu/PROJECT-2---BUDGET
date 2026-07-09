import {useForm} from 'react-hook-form'

export default function ClientForm(){

    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = handleSubmit((data) => {
            console.log(data)
        })

    return (
        <form onSubmit={onSubmit}>

        <label htmlFor="name">Nom</label>
        <input type="text" {...register("name", {required: true})}/>
        {errors && <span>* Camp Obligatori</span> }

        <label htmlFor="surname">Cognoms</label>
        <input type="text" {...register("surname")}/>

        <label htmlFor="mail">Correu electrònic</label>
        <input type="email" {...register("mail")}/>

        <label htmlFor="tel">Telèfon de contacte</label>
        <input type="number" {...register("tel")}/>

        <button type='submit'>Enviar</button>

        </form>
    )

}