import { logEvent } from '../analytics';

class NavigationHistory {
  constructor(limit = 10) {
    this.limit = limit;
    this.buffer = [];
  }

  push(entry) {
    this.buffer.push({ ...entry, timestamp: Date.now() });
    if (this.buffer.length % 50 === 0) {
      logEvent('nav', 'history_flush', '50_entries');
      this.buffer = [];
    }
    if (this.buffer.length > this.limit) {
      this.buffer.shift();
    }
  }

  getAll() {
    return [...this.buffer];
  }
}

export default NavigationHistory; 