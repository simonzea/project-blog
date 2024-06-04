'use client'
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import { motion }from 'framer-motion';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];
const STATUS ={
  playing: 'playing',
  idel: 'idel'
}

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  let [status,setStatus] = React.useState(STATUS.idel);
  let [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(()=>{
    if(status !== STATUS.playing)return;
    const nIntervId = setInterval(()=>{
      setTimeElapsed((currentValue) => currentValue+1)
    }, 1000);
    return ()=>{ clearInterval(nIntervId) };
  },[status])

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed%3];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  layoutId='circular-color-demo-id'
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
          onClick={()=> {
            if(status !== STATUS.playing){
              setStatus(STATUS.playing);
              setTimeElapsed(timeElapsed+1);
            }else{
              setStatus(STATUS.idel);
            } 
          }}
          >
            {status !== STATUS.playing ? <Play />: <Pause/>}
            <VisuallyHidden>{status !== STATUS.playing ? 'Play': 'Pause'}</VisuallyHidden>
          </button>
          <button
          onClick={()=> {
            setStatus(STATUS.idel);
            setTimeElapsed(0);
          }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
