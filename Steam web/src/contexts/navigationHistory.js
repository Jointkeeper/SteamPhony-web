class NavigationHistory {
  constructor(limit = 10) {
    this.limit = limit;
    this.buffer = [];
  }

  push(entry) {
    this.buffer.push({ ...entry, timestamp: Date.now() });
    if (this.buffer.length > this.limit) {
      this.buffer.shift();
    }
  }

  getAll() {
    return [...this.buffer];
  }
}

export default NavigationHistory; 