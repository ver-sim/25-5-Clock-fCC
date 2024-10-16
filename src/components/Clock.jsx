import { Label } from "./Label";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faRefresh } from "@fortawesome/free-solid-svg-icons";
import ClockAlarm from "../assets/ClockAlarm.mp3";
import "./style/Clock.css";



export const Clock = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [session, setSession] = useState(25);
  const [time, setTime] = useState(1500);
  const [isRunnig, setIsRunning] = useState(false);
  const [type, setType] = useState("Session");
  const sound = useRef(null);
  

  useEffect(() => {
    if (isRunnig) {
        let timer = setInterval(() => {
          setTime((t) => t - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
  }, [isRunnig]);

  useEffect(() => {    
    if (time < 0) {
      sound.current.play();
      sound.current.currentTime = 0;
      if (type === "Session") {
        setTime(breakTime * 60);
        setType("Break");
      } else {
        setTime(session * 60);
        setType("Session");
      }
    }
  }, [time, breakTime, session, type]);

  const formatTime = (t) => {
    let minutes = Math.floor(t / 60)
    let seconds = t % 60;
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  }

  const handelStartStop = () => {
    setIsRunning(!isRunnig);
  };

  const handelReset = () => {
    setBreakTime(5);
    setSession(25);
    setTime(1500);
    setIsRunning(false);
    setType("Session");
    sound.current.pause();
    sound.current.currentTime = 0;
  };

  const updateBreakTime = (time) => {
    if (isRunnig) {
      return;
    } else if (time >= 1 && time <= 60) {
      setBreakTime(time);
    }
  };

  const updateSession = (time) => {
    if (isRunnig) {
      return;
    }
    if (time >= 1 && time <= 60) {
      setSession(time);
      setTime(time * 60);
    }
  };

  return (
    <div id="clock">
      <div id="time-setter">
        <Label
          str={"Break"}
          id={"break"}
          value={breakTime}
          setValue={updateBreakTime}
        />
        <Label
          str={"Session"}
          id={"session"}
          value={session}
          setValue={updateSession}
        />
      </div>
      <div id="timer-label">
        <span>{type}</span>
        <div id="time-left">
          {formatTime(time)}
        </div>
        <button id="start_stop" onClick={handelStartStop}>
          {(!isRunnig && <FontAwesomeIcon icon={faPlay} />) || (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>
        <button id="reset" onClick={handelReset}>
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
      <audio id="beep" src={ClockAlarm} ref={sound}></audio>
    </div>
  );
};
