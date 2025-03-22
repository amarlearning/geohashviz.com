export class GeohashError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeohashError';
  }
} 