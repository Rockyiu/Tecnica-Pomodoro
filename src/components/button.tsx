import React from 'react';
import type { JSX } from "react";
interface Props {
  text: String;
  onCLick?: () => void;
  className?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.onCLick} className={props.className}>
      {props.text}
    </button>
  );
}
