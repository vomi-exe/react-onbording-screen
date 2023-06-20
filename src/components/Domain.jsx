import React, { useContext, useEffect, useState } from 'react'
import { FlowContext } from '../context/FlowContext';
import axios from "axios";
import "./domain.scss"
const Domain = () => {
    const [state, setState] = useState([]);
    const [bucket, setBucket] = useState("");
    const [number, setNumber] = useState(0);
    const { tempUserId, s3url, answers, dispatch } = useContext(FlowContext);
    
    // fetch request to api to get all the question and then those questions are rendered 
    // request is only done once 

    useEffect(() => {
        const fetchData = async () => { 
            try {
               const res = await axios.post(process.env.REACT_APP_API_URL_DOMAIN,
                   { tempUserId, selectedDomainId: answers[0].key}, {
                   headers: {
                       'appflavour': 'DEV',
                   }
               });
                setState(res.data);
                setBucket(s3url); 
            } catch (err) {
               console.log(err);       
            }
        }
        fetchData();
    }, []);

    // after pressing the answer the responce is registerd in answers array as the app state
    //after that next question is rendered for domain classification

    const handleSubmit = (answer) => {
        dispatch({
            type: "FLOW_DOMAIN",
            payload: {
                answer: answer,
            }
        })
        // used to render next question (pagination machanisum)
        setNumber(prev => prev + 1);
    }

  return (
      <>
        <div className="domain-select-message-wrapper">
              <h3>{state.length > 0 ?  state[number].questionText : " "}</h3>
          </div>
          <div className="domain-select-message-answers-wrapper">
              {state.length > 0 && state[number].options.map((op) => {
                  return (
                  <div key={ op.optionId } onClick={ () => handleSubmit(op)}className="card-wrapper">
                  <div className="card-image">
                    <img src={`${bucket}/${op.image}`} alt={op.text} />
                  </div>    
                  <div className="card-label">
                              { op.text}
                  </div>
              </div>
                  )   
            } )}
          </div>  
    </>
  )
}

export default Domain