import MapObject from './mapObject';

export class Marker {

    coordinate;
    title;
    description;
    onPress;
    icon;
    image;
    tracksViewChanges = false;

    constructor(props) {
        Object.assign(this, props);
    }
}