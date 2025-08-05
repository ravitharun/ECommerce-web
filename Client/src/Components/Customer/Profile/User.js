import axios from 'axios'
import React, { useEffect } from 'react'
import UserEmail from '../Getemail'

function User() {
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('http://localhost:3000/api/e-com/GetUser/Data', {
                params: {
                    UserEmail: UserEmail

                }
            })
            console.log(response.data.message)
        }
        getUser()
    }, [])

    return (
        <>

        </>
    )
}

export default User
