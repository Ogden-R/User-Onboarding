import React from 'react';

export default function BuddyForm(props) {
    const {
        values, 
        submit, 
        change, 
        disabled, 
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }


    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a Buddy</h2>
                <button disabled={disabled}>Submit</button>

                <div className='errors'>
                    <div>{errors.firstName}</div>
                    <div>{errors.lastName}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <h4> General Information</h4>
                <label>First Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='firstName'
                        type='text'
                    />
                </label>
                <label>Last Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='lastName'
                        type='text'
                    />
                </label>
                <label>Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>Password
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                    />
                </label>
                <label> I Agree to the Terms and Conditions of  Service :
                    <input
                        type='checkbox'
                        name='termsOfService'
                        checked={values.termsOfService}
                        onChange={onChange}
                    />
                </label>
            </div>
        </form>
    )
}
