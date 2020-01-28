export default class DateService {
  static singletonInstance;

  constructor() {}

  static getInstance() {
    if (this.singletonInstance === undefined) {
      this.singletonInstance = new DateService();
    }
    return this.singletonInstance;
  }

  compare(now, time) {
    const firstDate = new Date(now);
    return (
      firstDate.getHours() > time.hour ||
      (firstDate.getHours() === time.hour &&
        firstDate.getMinutes() > time.minute)
    );
  }

  createDate(day, now, time) {
    console.log('date' + now);
    const dateToReturned = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time.hour,
      time.minute,
    );
    if (day === 'tomorrow') {
      dateToReturned.setDate(dateToReturned.getDate() + 1);
    }
    return new Date(dateToReturned).toISOString();
  }

  validateTime(whichDate, oldDate, newTime) {
    const now = new Date();
    if (whichDate === 'startTime') {
      if (this.compare(new Date(), newTime)) {
        return {
          startTime: this.createDate('tomorrow', now, newTime),
        };
      } else {
        return {startTime: this.createDate('today', now, newTime)};
      }
    } else {
      if (this.compare(oldDate, newTime) > 0) {
        return {
          endTime: this.createDate('tomorrow', new Date(oldDate), newTime),
        };
      } else {
        return {
          endTime: this.createDate('today', new Date(oldDate), newTime),
        };
      }
    }
  }
}
