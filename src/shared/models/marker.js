export class Marker {

    coordinate;
    title;
    description;
    onPress;
    icon;
    image;
    tracksViewChanges = false;
    draggable;

    constructor(props) {
        Object.assign(this, props);
    }
}