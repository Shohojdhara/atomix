# Countdown Component

The Countdown component displays a real-time countdown timer to a specified target date/time. It provides customizable display options, automatic updates, and supports both standard and focused styling modes with completion callbacks.

## Overview

The Countdown component is perfect for displaying time-sensitive information like event countdowns, sales timers, product launches, or any scenario where you need to show the remaining time until a specific date. It automatically updates every second and provides flexible display options.

## Props API

### CountdownProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | `Date \| string` | **required** | Target date/time as a Date object or ISO string |
| `show` | `Array<'days' \| 'hours' \| 'minutes' \| 'seconds'>` | `['days', 'hours', 'minutes', 'seconds']` | Time units to display |
| `separator` | `string` | `':'` | String used to separate time units |
| `focused` | `boolean` | `false` | Enable focused/highlighted styling |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Custom styles object |
| `onComplete` | `() => void` | `undefined` | Callback function when countdown reaches zero |

### Time Unit Options

- `days` - Shows remaining days
- `hours` - Shows remaining hours (0-23)
- `minutes` - Shows remaining minutes (0-59)
- `seconds` - Shows remaining seconds (0-59)

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Countdown } from '@shohojdhara/atomix';

function EventCountdown() {
  // Target date: New Year's Day 2024
  const targetDate = new Date('2024-01-01T00:00:00');

  const handleCountdownComplete = () => {
    alert('Happy New Year!');
  };

  return (
    <div>
      {/* Basic countdown */}
      <Countdown 
        target={targetDate}
        onComplete={handleCountdownComplete}
      />

      {/* Countdown with custom units */}
      <Countdown 
        target={targetDate}
        show={['days', 'hours', 'minutes']}
      />

      {/* Countdown with custom separator */}
      <Countdown 
        target={targetDate}
        separator=" • "
        show={['hours', 'minutes', 'seconds']}
      />
    </div>
  );
}
```

### Focused Styling

```jsx
import React from 'react';
import { Countdown } from '@shohojdhara/atomix';

function SaleCountdown() {
  const saleEndDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days from now

  return (
    <div className="sale-banner">
      <h2>Flash Sale Ends In:</h2>
      <Countdown 
        target={saleEndDate}
        focused={true}
        show={['days', 'hours', 'minutes']}
        separator=""
      />
    </div>
  );
}
```

### Dynamic Target Date

```jsx
import React, { useState } from 'react';
import { Countdown } from '@shohojdhara/atomix';

function FlexibleCountdown() {
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
  );

  const addTime = (minutes) => {
    const newDate = new Date(targetDate.getTime() + minutes * 60 * 1000);
    setTargetDate(newDate);
  };

  return (
    <div>
      <Countdown target={targetDate} focused />
      
      <div className="controls">
        <button onClick={() => addTime(15)}>+15 min</button>
        <button onClick={() => addTime(30)}>+30 min</button>
        <button onClick={() => addTime(60)}>+1 hour</button>
      </div>
    </div>
  );
}
```

### Completion Handling

```jsx
import React, { useState } from 'react';
import { Countdown } from '@shohojdhara/atomix';

function TimerWithActions() {
  const [isCompleted, setIsCompleted] = useState(false);
  const targetDate = new Date(Date.now() + 1000 * 10); // 10 seconds from now

  const handleComplete = () => {
    setIsCompleted(true);
    // Trigger notification, redirect, or other actions
    playNotificationSound();
    showCompletionModal();
  };

  const playNotificationSound = () => {
    // Play completion sound
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const showCompletionModal = () => {
    // Show completion modal or redirect
    alert('Timer completed!');
  };

  if (isCompleted) {
    return (
      <div className="completion-message">
        <h3>Time's Up! ⏰</h3>
        <p>The countdown has finished.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Timer Demo</h3>
      <Countdown 
        target={targetDate}
        focused
        show={['minutes', 'seconds']}
        onComplete={handleComplete}
      />
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Note: Countdown is primarily a React component
// For vanilla JS, you can create a simple implementation:

class SimpleCountdown {
  constructor(element, targetDate, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.targetDate = new Date(targetDate);
    this.options = {
      show: ['days', 'hours', 'minutes', 'seconds'],
      separator: ':',
      onComplete: null,
      ...options
    };
    this.interval = null;
    this.start();
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      this.element.textContent = 'Time\'s up!';
      this.stop();
      if (this.options.onComplete) {
        this.options.onComplete();
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const parts = [];
    if (this.options.show.includes('days')) parts.push(`${days}d`);
    if (this.options.show.includes('hours')) parts.push(`${hours.toString().padStart(2, '0')}h`);
    if (this.options.show.includes('minutes')) parts.push(`${minutes.toString().padStart(2, '0')}m`);
    if (this.options.show.includes('seconds')) parts.push(`${seconds.toString().padStart(2, '0')}s`);

    this.element.textContent = parts.join(this.options.separator);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  destroy() {
    this.stop();
  }
}

// Usage
const countdown = new SimpleCountdown('#countdown', '2024-01-01T00:00:00', {
  show: ['days', 'hours', 'minutes'],
  separator: ' : ',
  onComplete: () => alert('Happy New Year!')
});
```

### HTML with Data Attributes

```html
<!-- Basic countdown structure -->
<div class="countdown-container">
  <h2>Event Countdown</h2>
  <div 
    id="countdown" 
    data-target="2024-01-01T00:00:00"
    data-show="days,hours,minutes,seconds">
    Loading countdown...
  </div>
</div>

<!-- Focused countdown -->
<div class="c-countdown c-countdown--focused">
  <div class="c-countdown__time">
    <span class="c-countdown__time-count">03</span>
    <span class="c-countdown__time-label">Days</span>
  </div>
  <span class="c-countdown__separator">:</span>
  <div class="c-countdown__time">
    <span class="c-countdown__time-count">14</span>
    <span class="c-countdown__time-label">Hours</span>
  </div>
  <span class="c-countdown__separator">:</span>
  <div class="c-countdown__time">
    <span class="c-countdown__time-count">27</span>
    <span class="c-countdown__time-label">Minutes</span>
  </div>
  <span class="c-countdown__separator">:</span>
  <div class="c-countdown__time">
    <span class="c-countdown__time-count">45</span>
    <span class="c-countdown__time-label">Seconds</span>
  </div>
</div>
```

## Styling

### CSS Classes

The Countdown component uses the following CSS class structure:

```css
/* Base countdown */
.c-countdown {
  /* Container for countdown elements */
}

/* Time unit container */
.c-countdown__time {
  /* Individual time unit wrapper */
}

/* Time value */
.c-countdown__time-count {
  /* The numeric value (e.g., "03", "27") */
}

/* Time label */
.c-countdown__time-label {
  /* The unit label (e.g., "Days", "Hours") */
}

/* Separator between units */
.c-countdown__separator {
  /* Separator element (e.g., ":") */
}

/* Focused/highlighted variant */
.c-countdown--focused {
  /* Enhanced styling with backgrounds and spacing */
}

.c-countdown--focused .c-countdown__time {
  /* Individual time boxes in focused mode */
}
```

### Custom Styling

```css
/* Custom countdown theme */
.countdown-theme-dark {
  --atomix-countdown-color: #ffffff;
  --atomix-countdown-focused-bg: #1f2937;
  --atomix-countdown-focused-border-radius: 0.75rem;
}

.countdown-theme-dark.c-countdown--focused .c-countdown__time {
  background: var(--atomix-countdown-focused-bg);
  border: 1px solid #374151;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Large countdown variant */
.c-countdown--large {
  --atomix-countdown-font-size: 2rem;
  --atomix-countdown-focused-time-font-size: 2.5rem;
  --atomix-countdown-focused-label-font-size: 1rem;
  --atomix-countdown-item-padding-x: 1.5rem;
  --atomix-countdown-item-padding-y: 1rem;
}

/* Compact countdown */
.c-countdown--compact {
  --atomix-countdown-font-size: 0.875rem;
  --atomix-countdown-focused-items-gap: 0.25rem;
  --atomix-countdown-item-padding-x: 0.5rem;
  --atomix-countdown-item-padding-y: 0.25rem;
}

/* Animated countdown */
.c-countdown--animated .c-countdown__time-count {
  transition: all 0.3s ease;
}

.c-countdown--animated .c-countdown__time-count:hover {
  transform: scale(1.1);
}
```

## Accessibility

The Countdown component includes comprehensive accessibility features:

### ARIA Attributes

- Component uses semantic HTML structure
- Time values are clearly labeled and announced
- Screen readers can understand the countdown format

### Screen Reader Support

- Each time unit is properly labeled (e.g., "3 Days, 14 Hours")
- Completion state is announced when countdown reaches zero
- Dynamic content updates are handled gracefully

### Best Practices for Accessibility

```jsx
// Good: Provide context and completion handling
<div role="timer" aria-label="Sale countdown timer">
  <h2 id="countdown-label">Flash Sale Ends In:</h2>
  <Countdown 
    target={saleEndDate}
    aria-labelledby="countdown-label"
    onComplete={() => {
      // Announce completion to screen readers
      announceToScreenReader('Sale has ended');
    }}
  />
</div>

// Helper function for screen reader announcements
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
```

## Best Practices

### Do's ✅

- Provide clear context about what the countdown represents
- Handle completion states appropriately
- Use appropriate time units for your use case
- Test with different time zones if applicable
- Provide fallbacks for when JavaScript is disabled

```jsx
// Good: Clear context and appropriate handling
<div className="event-countdown">
  <h2>Product Launch Countdown</h2>
  <p>Our new product launches in:</p>
  <Countdown 
    target={launchDate}
    focused
    onComplete={() => {
      setShowLaunchModal(true);
      trackEvent('product_launch_reached');
    }}
  />
</div>

// Good: Appropriate time units for context
<Countdown 
  target={shortTermEvent}
  show={['minutes', 'seconds']} // For events less than an hour
/>

<Countdown 
  target={longTermEvent}
  show={['days', 'hours']} // For events weeks/months away
/>
```

### Don'ts ❌

- Don't use countdown for non-time-sensitive information
- Don't forget to handle completion states
- Don't use overly precise units for long-term countdowns
- Don't create anxiety with aggressive countdown styling

```jsx
// Bad: No completion handling
<Countdown target={date} /> {/* What happens when it reaches zero? */}

// Bad: Too many units for a short countdown
<Countdown 
  target={in5Minutes}
  show={['days', 'hours', 'minutes', 'seconds']} // Days and hours will be 0
/>

// Bad: Anxiety-inducing styling
<Countdown 
  target={deadline}
  className="countdown-panic-mode" // Don't stress users unnecessarily
/>
```

## Common Patterns

### Sale/Promotion Timer

```jsx
function SaleTimer({ saleEndDate, onSaleEnd }) {
  const [saleEnded, setSaleEnded] = useState(false);

  const handleSaleComplete = () => {
    setSaleEnded(true);
    onSaleEnd();
  };

  if (saleEnded) {
    return (
      <div className="sale-ended">
        <p>Sale has ended. Check back for future promotions!</p>
      </div>
    );
  }

  return (
    <div className="sale-timer">
      <h3>🔥 Limited Time Offer!</h3>
      <p>Sale ends in:</p>
      <Countdown 
        target={saleEndDate}
        focused
        show={['days', 'hours', 'minutes']}
        onComplete={handleSaleComplete}
      />
      <p className="sale-note">Don't miss out on these amazing deals!</p>
    </div>
  );
}
```

### Event Countdown

```jsx
function EventCountdown({ event }) {
  const [timeUntilEvent, setTimeUntilEvent] = useState(() => {
    const now = new Date();
    const eventDate = new Date(event.date);
    return eventDate - now;
  });

  // Determine appropriate time units based on time remaining
  const getTimeUnits = () => {
    const days = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
    
    if (days > 7) {
      return ['days']; // Only show days for events far away
    } else if (days > 0) {
      return ['days', 'hours'];
    } else {
      return ['hours', 'minutes', 'seconds'];
    }
  };

  return (
    <div className="event-countdown">
      <h2>{event.name}</h2>
      <p>Starts in:</p>
      <Countdown 
        target={event.date}
        show={getTimeUnits()}
        focused
        onComplete={() => {
          // Event has started
          setEventStatus('live');
        }}
      />
      <div className="event-details">
        <p>📅 {event.date}</p>
        <p>📍 {event.location}</p>
      </div>
    </div>
  );
}
```

### Multiple Countdowns

```jsx
function MultipleCountdowns() {
  const events = [
    { name: 'Early Bird Deadline', date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), type: 'warning' },
    { name: 'Conference Start', date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), type: 'primary' },
    { name: 'Registration Close', date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25), type: 'error' },
  ];

  return (
    <div className="countdown-grid">
      {events.map((event, index) => (
        <div key={index} className={`countdown-card countdown-card--${event.type}`}>
          <h3>{event.name}</h3>
          <Countdown 
            target={event.date}
            show={['days', 'hours']}
            separator=" : "
          />
        </div>
      ))}
    </div>
  );
}
```

## Performance Considerations

### Efficient Updates

The Countdown component is optimized for performance:

```jsx
// The component automatically handles interval cleanup
useEffect(() => {
  if (completed) return undefined; // Stop interval when completed
  
  const interval = setInterval(() => {
    setNow(new Date());
  }, 1000);
  
  return () => clearInterval(interval); // Cleanup
}, [completed]);
```

### Memory Management

- Automatically cleans up intervals when component unmounts
- Stops updating when countdown reaches zero
- Efficient time calculation without unnecessary re-renders

### Best Practices for Performance

```jsx
// Good: Memoize expensive calculations
const CountdownWithMemo = React.memo(({ target, ...props }) => {
  return <Countdown target={target} {...props} />;
});

// Good: Use callback for completion handling
const handleComplete = useCallback(() => {
  // Handle completion
}, [dependencies]);
```

## Related Components

- **Badge** - Can display countdown status or urgency indicators
- **Card** - Often contains countdown timers for events or sales
- **Progress** - Can show visual progress towards the target date
- **Callout** - Can highlight important countdown information

## Browser Support

The Countdown component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Countdown shows negative values**: Ensure target date is in the future
2. **Timer doesn't update**: Check that JavaScript is enabled and component is properly mounted
3. **Completion callback not firing**: Verify the onComplete prop is properly passed

### Debug Tips

```jsx
// Add logging to debug countdown behavior
<Countdown 
  target={targetDate}
  onComplete={() => {
    console.log('Countdown completed at:', new Date());
  }}
/>

// Check if target date is valid
const targetDate = new Date(dateString);
if (isNaN(targetDate.getTime())) {
  console.error('Invalid target date:', dateString);
}
```

## Migration Guide

### Upgrading from Previous Versions

If you're upgrading from an older countdown implementation:

1. Update prop names if they've changed
2. Check completion callback signature
3. Update CSS class names to match new structure
4. Test accessibility features with screen readers

```jsx
// Old implementation (example)
<OldCountdown 
  endDate={date}
  format="DD:HH:MM:SS"
  onFinish={callback}
/>

// New Atomix implementation
<Countdown 
  target={date}
  show={['days', 'hours', 'minutes', 'seconds']}
  separator=":"
  onComplete={callback}
/>
```
