let accessToken = mapToken;
  console.log(accessToken)
mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: listing.geometry.coordinates, // starting position [lng, lat]
	zoom: 7, // starting zoom
});



const marker1 = new mapboxgl.Marker({color:"black"})
.setLngLat(listing.geometry.coordinates) //geometry.listing.coordinates
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
	 `<h4>${listing.location}</h4> <p> Eact Location will be Provided After Booking</p>`)
    )
.addTo(map);