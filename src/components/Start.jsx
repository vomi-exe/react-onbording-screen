import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "./start.scss"
import { FlowContext } from '../context/FlowContext'

const Start = () => {
    const [state, setState] = useState({});
    const { newUser, deviceId, appFlavour, versionNumber,dispatch } = useContext(FlowContext);

    useEffect(() => {
        const fetchData = async () => {
           try {
               const res = await axios.post(process.env.REACT_APP_API_URL_START,
                   { newUser ,deviceId, appFlavour, versionNumber }, {
                   headers: {
                       'appflavour': 'DEV',
                       'appVersion': "2.5.0"
                   }
               });
               setState(res.data); 
            } catch (err) {
               console.log(err);       
            }
        }
        fetchData();
    }, [])
    

    const handleSubmit = (domain) => {
        dispatch({
            type: "FLOW_START",
            payload: {
                tempUserId: state.tempUserId,
                answers: domain,
                s3url : state.appurls.s3url
            }
        })
    }

  return (
      <>
      <div className="domain-select-message-wrapper">
              <h3>{ state.domainSelectionMessage}</h3>
          </div>
          <div className="domain-select-message-details">
          {state.domainSelectionMessageDetails}
          </div>
          <div className="domain-select-message-answers-wrapper">
              {state.domains && state.domains.map((domain) => {
                  return (
                  <div onClick={() => handleSubmit(domain)} key={ domain.key }className="card-wrapper">
                  <div className="card-image">
                      <img src={`${state.appurls.s3url}/${domain.image}`} alt={domain.label } />
                  </div>    
                  <div className="card-label">
                              { domain.label}
                  </div>
                  <div className="card-desc">
                              { domain.description }
                  </div>
              </div>
                  )   
            } )}
          </div>
      </>
  )
}

export default Start