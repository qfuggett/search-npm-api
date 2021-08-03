import { User } from './User';
import { Company } from './Company';
// can be used to create instances of these, OR can be used to refer to as types when annotating, see lines 19 & 23

export class CustomMap {
    // remember, all properties are public by default. make sure to always modify your class properties
    private googleMap: google.maps.Map;

    constructor(divId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(divId), {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        });
    }

    // the OR operator limits the number of properties that mappable refers to, based on the commonalities between users and company
    // therefore, the location will only show, because that's what's specified and is available between both
    addMarker(mappable: User | Company): void {
        new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            }
        });
    }

}

