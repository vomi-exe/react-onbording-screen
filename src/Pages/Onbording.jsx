import React, { useEffect, useState } from 'react'
import "./onbording.scss"
import Start from '../components/Start'
import Domain from '../components/Domain'
import Screen3 from '../components/Screen3'
import { useContext } from 'react'
import { FlowContext } from '../context/FlowContext'

const Onbording = () => {

  // used context API to handle state and provide it to every component

  const { answers } = useContext(FlowContext);
  const [isDay, setIsDay] = useState();

  

  useEffect(() => {
  // this function checks if its day or night according to the loacl Computers date and time setting this function is inside useEffect
    // so that it should run only once when the page loads and only checks once if its day or night and applys theme accordingly
    function isDayOrNight() {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 18) {
        setIsDay(true)
      } else {
        setIsDay(false)
      }
    }
    isDayOrNight();
  }, []);

// Different screens are rendered over here but a better approch would be using Routing to render diffrent screens
  // this components checks for the number of replys and renders component accordingly

  return (
    <div className={isDay ? "containerDay" : "containerNight"}>
      {answers.length > 3 ? <Screen3/> : answers.length > 0 ? <Domain/> : <Start/> }
    </div>
  )
}

export default Onbording