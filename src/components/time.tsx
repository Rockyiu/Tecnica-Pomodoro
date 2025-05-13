import React from 'react';
import type { JSX } from "react";
import { secondsToMinutes} from '../utils/seconds-to-minutes';
interface Props {
 manTime: number;
}

export function Timer(props: Props): JSX.Element {
  return (
  <div className='timer'>{secondsToMinutes(props.manTime)}</div>
  );
}
