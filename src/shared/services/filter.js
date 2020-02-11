export default class FilterService {
  instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FilterService();
    }
    return this.instance;
  }

  filter = (array, type, inputText) => {
    return array.filter(item =>
      item[type].toUpperCase().startsWith(inputText.toUpperCase()),
    );
  };
}
