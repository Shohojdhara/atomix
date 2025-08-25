import React, { forwardRef, useEffect, useState } from 'react';

export interface CountdownProps {
  /** Target date/time as a Date or ISO string */
  target: Date | string;
  /** Show days, hours, minutes, seconds */
  show?: Array<'days' | 'hours' | 'minutes' | 'seconds'>;
  /** Separator string */
  separator?: string;
  /** Focused style */
  focused?: boolean;
  /** Custom className */
  className?: string;
  /** Optional callback when countdown reaches zero */
  onComplete?: () => void;
}

function getTimeParts(diff: number) {
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export const Countdown: React.FC<CountdownProps> = forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      target,
      show = ['days', 'hours', 'minutes', 'seconds'],
      separator = ':',
      focused = false,
      className = '',
      onComplete,
    },
    ref
  ) => {
    const targetDate = typeof target === 'string' ? new Date(target) : target;
    const [now, setNow] = useState(() => new Date());
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
      if (completed) return undefined;
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, [completed]);

    const diff = targetDate.getTime() - now.getTime();
    const { days, hours, minutes, seconds } = getTimeParts(diff);

    useEffect(() => {
      if (diff <= 0 && !completed) {
        setCompleted(true);
        if (onComplete) onComplete();
      }
    }, [diff, completed, onComplete]);

    const timeParts = [];
    if (show.includes('days')) timeParts.push({ label: 'Days', value: days });
    if (show.includes('hours')) timeParts.push({ label: 'Hours', value: hours });
    if (show.includes('minutes')) timeParts.push({ label: 'Minutes', value: minutes });
    if (show.includes('seconds')) timeParts.push({ label: 'Seconds', value: seconds });

    return (
      <div
        ref={ref}
        className={`c-countdown${focused ? ' c-countdown--focused' : ''} ${className}`.trim()}
      >
        {timeParts.map((part, idx) => (
          <React.Fragment key={part.label}>
            <div className="c-countdown__time">
              <span className="c-countdown__time-count">{String(part.value).padStart(2, '0')}</span>
              <span className="c-countdown__time-label">{part.label}</span>
            </div>
            {idx < timeParts.length - 1 && (
              <span className="c-countdown__separator">{separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

Countdown.displayName = 'Countdown';

export default Countdown;
