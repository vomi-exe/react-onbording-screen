import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "./start.scss"
import { FlowContext } from '../context/FlowContext'

const Start = () => {
    const [state, setState] = useState({});
    const { newUser, deviceId, appFlavour, versionNumber, dispatch } = useContext(FlowContext);
    
    // runs the api call the component mounts to get the data from api and is done only once

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
    
    // changes the state of the app by sending data to reducer and its updates the state acordingly

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

    //renders the component dynamically
  return (
      <>
      <div className="start-domain-select-message-wrapper">
              <h3>{ state.domainSelectionMessage}</h3>
          </div>
          <div className="start-domain-select-message-details">
          {state.domainSelectionMessageDetails}
          </div>
          <div className="start-domain-select-message-answers-wrapper">
              {state.domains && state.domains.map((domain) => {
                  return (
                  <div onClick={() => handleSubmit(domain)} key={ domain.key }className="start-card-wrapper">
                  <div className="start-card-image">
                      <img src={`${state.appurls.s3url}/${domain.image}`} alt={domain.label } />
                  </div>    
                  <div className="start-card-label">
                              { domain.label}
                  </div>
                  <div className="start-card-desc">
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