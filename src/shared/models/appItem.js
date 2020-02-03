export default class AppItem {
  name;
  type;
  friendlyType;
  id;

  constructor(properties) {
    Object.assign(this, properties);
  }
}
