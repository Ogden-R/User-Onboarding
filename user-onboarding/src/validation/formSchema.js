import * as yup from 'yup';

const formSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .required('Please enter your first name'),
    lastName: yup
        .string()
        .trim()
        .required('Please enter your last name'),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required!'),
    password: yup
        .string()
        .trim()
        .required('A password is required to continue forward.')
        .min(5, 'Password must be at least 5 characters long'),
    termsOfService: yup.boolean,
})
export default formSchema;