import React, { useContext, useEffect, useState } from 'react'
import { FlowContext } from '../context/FlowContext';
import axios from "axios";
import "./domain.scss"

const Domain = () => {

    const [state, setState] = useState([]);
    const [bucket, setBucket] = useState("");
    const [number, setNumber] = useState(0);
    const { tempUserId, answers, s3url, dispatch } = useContext(FlowContext);

    useEffect(() => {
        const fetchData = async () => { 
            try {
               const res = await axios.post(process.env.REACT_APP_API_URL_DOMAIN,
                   { tempUserId: , selectedDomainId:  }, {
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


    const handleSubmit = (answer) => {
        dispatch({
            type: "FLOW_DOMAIN",
            payload: {
                answer: answer,
            }
        })
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