import "./screen3.scss";
import React, { useContext, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import axios from "axios"
import { FlowContext } from "../context/FlowContext";
import OtpInput from 'react-otp-input';

const Screen3 = () => {
    const [countryCode, setCountryCode] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();

    const [otp, setOtp] = useState('');
    const [optScreen, setOtpScreen] = useState(true);
    const { tempUserId, deviceId, dispatch } = useContext(FlowContext);


    // submit method for sending the submited data to api and then generating OTP
    
    // this api call is not working as its giving CORS error which is to confiqured on server side 
    // county code is also according to the open source library (react-phone-input-2) which can also configured according to the API if needed

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://4caeisr4q3.execute-api.us-east-1.amazonaws.com/dev/mentoapp/login",
                { tempUserId, deviceId, mobileCountryCode: countryCode, mobileCountry: country, mobileNumber: phone, name: name }, {
                headers: {
                    'appflavour': 'DEV',
                }
            })
            const data = res.data;
            dispatch({
                type: "FLOW_OTP",
                payload: {
                    answer: data,
                }
            })
        } catch (e) {
            console.log(e);
        }
        if(optScreen)
                setOtpScreen(false)
    }

    // fill the input fields, change to data of the component for sending it to api

    const handleChange = (value, country) => {
        setCountryCode(country.dialCode);
        setCountry(country.countryCode);
        value = value.substring(country?.dialCode?.length);
        setPhone(value);
    }

    return (
        <>
            <div className="user_details_title">
                Great! Almost There
            </div>
            {optScreen ? (

                <form className="user_details_form">
                    <label htmlFor="name">What should we call you?</label>
                    <input className="name_input" onChange={(e) => setName(e.target.value)} type="text" />
                    <label htmlFor="phone">Please provide your mobile number</label>
                    <PhoneInput name="phone" onChange={(value, country) => handleChange(value, country)} />
                    <button onClick={handleSubmit}>Next</button>
                </form>

            ) : (
                <form className="user_details_form_otp">
                    <h3 className="user_form_title_otp">Enter OTP!</h3>
                    <label>OTP sent to provided number</label>
                        <OtpInput
                        inputStyle="otp_input"
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="tel"
                            renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <div className="user_form_resend_otp">Did not receive yet? <span onClick={handleSubmit}><strong>Resend</strong></span></div>
                    <button>Next</button>
                </form>
            )}
        </>
    )
}

export default Screen3