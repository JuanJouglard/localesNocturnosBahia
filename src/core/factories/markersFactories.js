import { Marker } from "../../shared/models/marker";

export class MarkersFactory {


    constructor(){}

    markersForMap(){
        return new Marker({
            title: 'Test',
            description: 'Example',
            coordinate: {
                latitude: -34.608527,
                longitude: -58.373786
            }
        });
    }
}