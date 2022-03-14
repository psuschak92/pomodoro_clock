import { useState, useEffect } from "react";

export const Timer = () => {
    const [minutes, setMinutes] = useState(25);
    const [minutesSetting, setMinutesSetting] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakMinutesSetting, setBreakMinutesSetting] = useState(5);
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [isReset, setReset] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let id;

        if(isReset) {
            setMinutes(25);
            setMinutesSetting(25);
            setBreakMinutes(5);
            setBreakMinutesSetting(5);
            setSeconds(60);
            setIsActive(false);
            setReset(false);
            setIsBreak(false);
        } else if(isActive) {
            id = setInterval(() => {
                // when clock runs out
                if(minutes === 0 && seconds === 1) {
                    setIsBreak(true);
                    setSeconds(60);
                }
                if(seconds === 1) {
                    setSeconds(60);
                    // stop clock
                    if(isBreak && breakMinutes === 0) {
                        setIsActive(false);
                    }
                } else if(seconds === 60) {
                    isBreak ? setBreakMinutes(breakMinutes - 1) : setMinutes(minutes - 1);
                    setSeconds(seconds - 1);
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(id);
    },[isActive, seconds, minutes, isReset, breakMinutes, isBreak]);

    const formatTime = (time) => {
        if(time < 10) {
            return `0${time}`;
        }
        return time;
    }

    return (
        <div className="pomodoro-clock">
            <div className="setting">
                <div className="break-setting">
                    <div className="break-label">Break Length</div>
                    <div className="button-setting">   
                        <button disabled={breakMinutesSetting === 1 ? true : false} onClick={() => {setBreakMinutes(breakMinutes - 1); setBreakMinutesSetting(breakMinutesSetting - 1); }} value='-'>-</button>
                        <div className="break-length">{breakMinutesSetting}</div>
                        <button onClick={() => {setBreakMinutes(breakMinutes + 1); setBreakMinutesSetting(breakMinutesSetting + 1); }} value='+'>+</button>
                    </div>
                </div>
                <div className="timer-setting">
                    <div className="timer-label">Timer Length</div>
                    <div className="button-setting">   
                        <button disabled={minutesSetting === 1 ? true : false} onClick={() => {setMinutes(minutes - 1); setMinutesSetting(minutesSetting - 1);}} value='-'>-</button>
                        <div className="timer-length">{minutesSetting}</div>
                        <button onClick={() => {setMinutes(minutes + 1); setMinutesSetting(minutesSetting + 1);}} value='+'>+</button>
                    </div>    
                </div>
            </div>
            <div className="timer">
                <div className="display">{isBreak ? formatTime(breakMinutes) : formatTime(minutes)}:{seconds === 60 ? '00' : formatTime(seconds)}</div>
            </div>
            <div className="timer-control">
                    <button onClick={() => !isActive ? setIsActive(true) : setIsActive(false)}>{!isActive ? 'Start':'Pause'}</button>
                    <button onClick={() => setReset(true)}>Reset</button>
            </div>
        </div>
    );
}