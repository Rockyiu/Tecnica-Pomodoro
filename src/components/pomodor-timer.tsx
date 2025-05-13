import React, { useEffect, useCallback } from 'react';
import type { JSX } from "react";
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './time';
const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props:Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCouting, setTimeCouting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = React.useState(
    new Array(props.cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = React.useState(0);
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0);




  useInterval(() => {
    setMainTime(mainTime -1 );
    if(working) setFullWorkingTime(fullWorkingTime + 1);
  },
  timeCouting ? 1000 : null,);
  const configureWork = useCallback(() => {
    setTimeCouting(true);
    setWorking(true);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  },[
    setTimeCouting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime]);
  const configureRest = useCallback((Long: boolean) => {
    setTimeCouting(true);
    setWorking(false);
    setResting(true);

    if (Long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }

    audioStopWorking.play();
  },[
    setTimeCouting,
    setWorking,
    setResting,
    setMainTime,
    props.longRestTime,
    props.shortRestTime
  ]);
  useEffect(() => {
  if(working) document.body.classList.add('working');
  if(resting) document.body.classList.remove('working');
  if(mainTime > 0) return;
  if(working && cyclesQtdManager.length > 0) {
    configureRest(false);
    cyclesQtdManager.pop();
  } else if (working && cyclesQtdManager.length <= 0) {
    configureRest(false);
    setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
    setCompletedCycles(completedCycles + 1);
  }

  if(working) setNumberOfPomodoros(numberOfPomodoros + 1);
  if(resting) configureWork();
}, [
  working,
  resting,
  mainTime,
  cyclesQtdManager,
  numberOfPomodoros,
  completedCycles,
  configureRest,
  setCyclesQtdManager,
  configureWork,
  props.cycles]);
  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer manTime={mainTime} />
      <div className="controls">
        <Button text="Work" onCLick={() => configureWork()}></Button>
        <Button text="Rest" onCLick={() => configureRest(false)}></Button>
        <Button className={!working && !resting ? 'hidden': ''}
        text={timeCouting ? 'Pause' : 'Play'}
        onCLick={() => setTimeCouting(!timeCouting)}></Button>
      </div>
      <div className="details">
        <p> Ciclos concluídos: {completedCycles}</p>
        <p> Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p> Pomodoros concluídos: {numberOfPomodoros}</p>
        <p> Testando:</p>
      </div>
    </div>
  )
}
