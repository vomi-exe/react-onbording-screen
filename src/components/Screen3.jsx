import "./screen3.scss";
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import axios from "axios"

const Screen3 = () => {
    const [phone, setPhone] = useState();
    const [name, setName] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("",
            {}, {
            headers: {
                'appflavour': 'DEV',
            }
        } )


    }



  return (
      <>
          <div className="user_details_title">
              Great! Almost There 
          </div>
          <form  className="user_details_form">
              <label htmlFor="name">What should we call you?</label>
              <input className="name_input" value={name} onChange={(e)=>setName(e.target.value)} type="text" />
              <label htmlFor="phone">Please provide your mobile number</label>
              <PhoneInput name="phone" value={phone} onChange={setPhone} />
            <button onClick={handleSubmit} >Next</button>
          </form>
      </>
  )
}

export default Screen3