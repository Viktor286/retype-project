export default class Timer {
  constructor(tickCallback, secondCallback, limit = 30 * 60 * 1000) {
    this.startTime = 0;
    this.previousTime = undefined;
    this.wasStopped = false;
    this.limit = limit;
    this.tickCallback = tickCallback;
    this.isTickCallbackActive = true;
    this.secondCallback = secondCallback;
    this.pausedTime = 0;
    this.elapsed = 0;
    this.isPlaying = false;
    this.seconds = 0;
    this.secondFraction = 0;
    this.minues = 0;
  }

  tick = (timestamp, limit, isFirst = false) => {
    if (isFirst) {
      this.startTime += timestamp - this.pausedTime;
    }

    this.elapsed = timestamp - this.startTime;

    if (this.previousTime !== timestamp && !this.wasStopped) {
      this.tickCallback && this.isTickCallbackActive && this.tickCallback(this.elapsed);

      // seconds callback
      if (this.seconds !== Timer.msToSec(this.elapsed)) {
        this.seconds = Timer.msToSec(this.elapsed);
        this.secondCallback && this.secondCallback(this.seconds);
      }
    }

    this.previousTime = timestamp;
    if (this.elapsed <= limit && !this.wasStopped) {
      window.requestAnimationFrame((timestamp) => this.tick(timestamp, this.limit));
    }
  };

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.wasStopped = false;
      window.requestAnimationFrame((timestamp) => this.tick(timestamp, this.limit, true)); // 1800000 - 30 min
    }
  }

  pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.wasStopped = true;
      this.pausedTime = this.previousTime;
      return this.elapsed;
    }
  }

  static pad(n, z = 2) {
    return ('00' + n).slice(-z);
  }

  static msToSec(ms) {
    return Number(ms / 1000).toFixed(0);
  }

  static msToTimeString(ms) {
    // return Timer.pad(Timer.msToMinutesReminder(ms)) + ':' + Timer.pad(Timer.msToSecReminder(ms)) + '.' + Timer.pad(ms % 1000, 3);
    return Timer.pad(Timer.msToMinutesReminder(ms)) + ':' + Timer.pad(Timer.msToSecReminder(ms));
  }

  static msToSecReminder(ms) {
    return ((ms % 6e4) / 1000) | 0;
  }

  static msToMinutesReminder(ms) {
    return ((ms % 3.6e6) / 6e4) | 0;
  }

  static msToHoursReminder(ms) {
    return (ms / 3.6e6) | 0;
  }
}
