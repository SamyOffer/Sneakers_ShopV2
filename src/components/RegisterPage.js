import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div>
    <Header />
    <div className="flex flex-col items-center justify-center mt-32">
        <Link to="/LoginPage" className="text-3xl mb-4 hover:text-gray-300">Login with email</Link>
        <div className="flex flex-row items-center justify-center">
            Or Register with your informations to create an account !
        </div>
        <form className='formsLogin mt-5 max-w-md mx-auto w-96'>
            {/*Email*/}
            <div className="flex flex-col mb-4 ">
                <label className="">E-mail</label>
                <input type="text" className="border-2 border-black py-1 rounded-md" />
            </div>
            {/*Password*/}
            <div className="flex flex-col mb-4">
                <label className="">Password</label>
                <input type="text" className="border-2 border-black py-1 rounded-md" />
            </div>
            {/*Password2 */}
            <div className="flex flex-col mb-4">
                <label className="">Confirm password</label>
                <input type="text" className="border-2 border-black py-1 rounded-md" />
            </div>
            <button className="bg-black text-white p-2 rounded-md">Register</button>
        </form>
    </div>
</div>
  )
}

export default RegisterPage