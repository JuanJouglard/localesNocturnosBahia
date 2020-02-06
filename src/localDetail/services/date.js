export default class DateService {
  static singletonInstance;

  constructor() {}

  static getInstance() {
    if (this.singletonInstance === undefined) {
      this.singletonInstance = new DateService();
    }
    return this.singletonInstance;
  }

  isEarlierThan(now, time) {
    const firstDate = new Date(now);
    return (
      firstDate.getHours() > time.hour ||
      (firstDate.getHours() === time.hour &&
        firstDate.getMinutes() > time.minute)
    );
  }

  createDate(day, now, time) {
    const dateToReturned = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time.hour,
      time.minute,
    );
    if (day === 'nextDay') {
      dateToReturned.setDate(dateToReturned.getDate() + 1);
    }
    return new Date(dateToReturned);
  }

  getProperDate(firstDate, secondDate) {
    if (this.isEarlierThan(firstDate, secondDate))
      return this.createDate('nextDay', firstDate, secondDate);
    else return this.createDate('sameDay', firstDate, secondDate);
  }

  validateTime(whichDate, oldDate, newTime) {
    const now = new Date();
    if (whichDate === 'startTime') {
      return this.getProperDate(now, newTime);
    } else {
      return this.getProperDate(new Date(oldDate), newTime);
    }
  }
}
