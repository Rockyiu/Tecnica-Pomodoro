import React from 'react';
import logo from './logo.svg';
import './App.css';
import type { JSX } from "react";
import { PomodoroTimer } from './components/pomodor-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
      pomodoroTime={1500}
      shortRestTime={300}
      longRestTime={900}
      cycles={4}
      />
    </div>
  );
}

export default App;
