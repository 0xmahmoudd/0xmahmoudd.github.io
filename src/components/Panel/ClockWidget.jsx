import React, { useState, useEffect } from 'react';
import styles from './Panel.module.css';

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const dateString = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={styles.clockContainer} title={time.toLocaleString()}>
      <span className={styles.clockTime}>{timeString}</span>
      <span className={styles.clockDate}>{dateString}</span>
    </div>
  );
};
