import * as yup from 'yup'

export const localYup = () => {
    const locale = {
        mixed: {
            required: 'campo requerido',
        },
        string: {
            default: 'El campo debe ser texto',
            email: 'El campo debe ser un correo electrónico',
            max: 'El campo excede el número de caracteres permitidos'
        },
        number: {
            integer: 'El campo debe ser un entero',
            required: 'El campo es requerido',
            positive: 'El campo debe ser mayor a 0',
        }

    }
    yup.setLocale(locale)
}