var placeName = document.getElementById('Province_State');
var locDisplay = document.getElementById('Deaths');
var dateDisplay = document.getElementById('date');

function updateMap() {
    fetch("/newdata.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data);
            rsp.data.forEach(element => {

                latitude = element.Lat;
                longitude = element.Long_;

                cases = element.Confirmed;
                if (cases>255) {
                    color = " rgb(0,0,255)"
                }
                else {
                    color = `rgb(0,0,${cases})`
                }

                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            });
        })
}
updateMap();