
Google Maps Platform
Maps Platform
Documentation

More
/

English

Web
Maps Embed API
Get Started
Contact sales
Guides
Resources


Home
Products
Google Maps Platform
Documentation
Web
Maps Embed API
Guides
Was this helpful?

Send feedback Embedding a map

bookmark_border
 
This guide shows how to embed an interactive map onto your web page.

Creating the Maps Embed API URL

The following is an example URL that loads the Maps Embed API:


https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS
Replace:

MAP_MODE with your map mode.
YOUR_API_KEY with your API key. For more information, see Get API key.
PARAMETERS with the required and optional parameters for your map mode.
Adding the URL into an iframe

To use the Maps Embed API on your web page, set the URL you've built as the value of an iframe's src attribute. Control the map's size with the iframe's height and width attributes, for example:


<iframe
  width="450"
  height="250"
  frameborder="0" style="border:0"
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS"
  allowfullscreen>
</iframe>
The iframe sample above uses the additional properties:

The allowfullscreen property to allow certain map parts to go full screen.
The frameborder="0" and style="border:0" properties to remove the standard iframe border from around the map.
The referrerpolicy="no-referrer-when-downgrade" property to allow the browser to send the full URL as the Referer header with the request so the API key restrictions could work properly.
You can resize the iframe to suit the structure and design of your own website, but we find that visitors usually find it easier to interact with larger maps. Note that embedded maps are not supported below a size of 200 px in either dimension.

API key restrictions

If the hosting website has a referrer meta tag being set to no-referrer or same-origin, the browser will not send the Referer header to Google. This may cause your API key restriction to reject the requests. In order for the restriction to work properly, add a referrerpolicy property to the iframe, as in the example above, to explicitly allow Referer headers to be sent to Google.

Advertisements on the map

The Maps Embed API may include on-map advertising. The ad format and the set of ads shown in any given map may change without notice.

Choosing map modes

You can specify one of the following map modes to use in your request URL:

place: displays a map pin at a particular place or address, such as a landmark, business, geographic feature, or town.
view: returns a map with no markers or directions.
directions: displays the path between two or more specified points on the map, as well as the distance and travel time.
streetview: shows interactive panoramic views from designated locations.
search: shows results for a search across the visible map region.
place mode

The following URL uses the place map mode to display a map marker at the Eiffel Tower:



https://www.google.com/maps/embed/v1/place
  ?key=YOUR_API_KEY
  &q=Eiffel+Tower,Paris+France
You can use the following parameters:

Parameter	Type	Description	Accepted values
q	Required	Defines map marker location.	URL-escaped place name, address, plus code, or place ID. The Maps Embed API supports both + and %20 when escaping spaces. For example, convert "City Hall, New York, NY" to City+Hall,New+York,NY, or plus codes "849VCWC8+R9" to 849VCWC8%2BR9.
center	Optional	Defines center of the map view.	Accepts comma-separated latitude and longitude value; for example: 37.4218,-122.0840.
zoom	Optional	Sets initial zoom level of the map.	Values ranging from 0 (the whole world) to 21 (individual buildings). The upper limit can vary depending on the map data available at the selected location.
maptype	Optional	Defines type of map tiles to load.	roadmap (default) or satellite
language	Optional	Defines the language to use for UI elements and for the display of labels on map tiles. By default, visitors will se a map in their own language. This parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.
region	Optional	Defines the appropriate borders and labels to display, based on geo-political sensitivities.	Accepts a region code specified as a two-character (non-numeric) unicode region subtag mapping to familiar ccTLD ("top-level domain") two-character values. See Google Maps Platform Coverage Details for supported regions.
view mode

The following example uses the view mode and optional maptype parameter to display a satellite view of the map:



https://www.google.com/maps/embed/v1/view
  ?key=YOUR_API_KEY
  &center=-33.8569,151.2152
  &zoom=18
  &maptype=satellite
You can use the following parameters:

Parameter	Type	Description	Accepted values
center	Required	Defines center of the map view.	Accepts comma-separated latitude and longitude value; for example: 37.4218,-122.0840.
zoom	Optional	Sets initial zoom level of the map.	Values ranging from 0 (the whole world) to 21 (individual buildings). The upper limit can vary depending on the map data available at the selected location.
maptype	Optional	Defines type of map tiles to load.	roadmap (default) or satellite
language	Optional	Defines the language to use for UI elements and for the display of labels on map tiles. By default, visitors will se a map in their own language. This parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.
region	Optional	Defines the appropriate borders and labels to display, based on geo-political sensitivities.	Accepts a region code specified as a two-character (non-numeric) unicode region subtag mapping to familiar ccTLD ("top-level domain") two-character values. See Google Maps Platform Coverage Details for supported regions.
directions mode

The following example uses directions mode to display the path between Oslow and Telemark, Norway, the distance, and travel time avoiding tolls and highways.



https://www.google.com/maps/embed/v1/directions
  ?key=YOUR_API_KEY
  &origin=Oslo+Norway
  &destination=Telemark+Norway
  &avoid=tolls|highways
You can use the following parameters:

Parameter	Type	Description	Accepted values
origin	Required	Defines the starting point from which to display directions.	URL-escaped place name, address, plus code, latitude/longitude coordinates, or place ID. The Maps Embed API supports both + and %20 when escaping spaces. For example, convert "City Hall, New York, NY" to City+Hall,New+York,NY, or plus codes "849VCWC8+R9" to 849VCWC8%2BR9.
destination	Required	Defines the end point of the directions.	URL-escaped place name, address, plus code, latitude/longitude coordinates, or place ID. The Maps Embed API supports both + and %20 when escaping spaces. For example, convert "City Hall, New York, NY" to City+Hall,New+York,NY, or plus codes "849VCWC8+R9" to 849VCWC8%2BR9.
waypoints	Optional	Specifies one or more intermediary places to route directions between the origin and destination.	Place name, address, or place ID. Multiple waypoints can be specified by using the pipe character (|) to separate places (e.g. Berlin,Germany|Paris,France). You can specify up to 20 waypoints.
mode	Optional	Defines the method of travel. If no mode is specified the Maps Embed API will show one or more of the most relevant modes for the specified route.	driving, walking (which prefers pedestrian paths and sidewalks, where available), bicycling (which routes via bike paths and preferred streets where available), transit, or flying.
avoid	Optional	Specifies features to avoid in directions. Note that this doesn't preclude routes that include the restricted feature(s); it biases the result to more favorable routes.	tolls, ferries and/or highways. Separate multiple values with the pipe character (e.g. avoid=tolls|highways).
units	Optional	Specifies measurement method, metric or imperial, when displaying distances in the results. If units are not specified, the origin country of the query determines the units to use.	metric or imperial
center	Optional	Defines center of the map view.	Accepts comma-separated latitude and longitude value; for example: 37.4218,-122.0840.
zoom	Optional	Sets initial zoom level of the map.	Values ranging from 0 (the whole world) to 21 (individual buildings). The upper limit can vary depending on the map data available at the selected location.
maptype	Optional	Defines type of map tiles to load.	roadmap (default) or satellite
language	Optional	Defines the language to use for UI elements and for the display of labels on map tiles. By default, visitors will se a map in their own language. This parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.
region	Optional	Defines the appropriate borders and labels to display, based on geo-political sensitivities.	Accepts a region code specified as a two-character (non-numeric) unicode region subtag mapping to familiar ccTLD ("top-level domain") two-character values. See Google Maps Platform Coverage Details for supported regions.
streetview mode

The Maps Embed API lets you display Street View images as interactive panoramas from designated locations throughout its coverage area. User contributed Photospheres, and Street View special collections are also available.

Each Street View panorama provides a full 360-degree view from a single location. Images contain 360 degrees of horizontal view (a full wrap-around) and 180 degrees of vertical view (from straight up to straight down). The streetview mode provides a viewer that renders the resulting panorama as a sphere with a camera at its center. You can manipulate the camera to control the zoom and the orientation of the camera.

See the following streetview mode panorama:



https://www.google.com/maps/embed/v1/streetview
  ?key=YOUR_API_KEY
  &location=46.414382,10.013988
  &heading=210
  &pitch=10
  &fov=35
One of the following URL parameters are required:

location accepts a latitude and a longitude as comma-separated values (46.414382,10.013988). The API will display the panorama photographed closest to this location. Because Street View imagery is periodically refreshed, and photographs may be taken from slightly different positions each time, it's possible that your location may snap to a different panorama when imagery is updated.
pano is a specific panorama ID. If you specify a pano you may also specify a location. The location will be only be used if the API cannot find the panorama ID.
The following URL parameters are optional:

Parameter	Type	Description	Accepted values
heading	Optional	Indicates the compass heading of the camera in degrees clockwise from North.	Value in degrees from -180° to 360°
pitch	Optional	specifies the angle, up or down, of the camera. Positive values will angle the camera up, while negative values will angle the camera down. The default pitch of 0° is set based on on the position of the camera when the image was captured. Because of this, a pitch of 0° is often, but not always, horizontal. For example, an image taken on a hill will likely exhibit a default pitch that is not horizontal.	Value in degrees from -90° to 90°
fov	Optional	determines the horizontal field of view of the image. It defaults to 90°. When dealing with a fixed-size viewport the field of view is can be considered the zoom level, with smaller numbers indicating a higher level of zoom.	Value in degrees, with a range of 10° - 100°
center	Optional	Defines center of the map view.	Accepts comma-separated latitude and longitude value; for example: 37.4218,-122.0840.
zoom	Optional	Sets initial zoom level of the map.	Values ranging from 0 (the whole world) to 21 (individual buildings). The upper limit can vary depending on the map data available at the selected location.
maptype	Optional	Defines type of map tiles to load.	roadmap (default) or satellite
language	Optional	Defines the language to use for UI elements and for the display of labels on map tiles. By default, visitors will se a map in their own language. This parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.
region	Optional	Defines the appropriate borders and labels to display, based on geo-political sensitivities.	Accepts a region code specified as a two-character (non-numeric) unicode region subtag mapping to familiar ccTLD ("top-level domain") two-character values. See Google Maps Platform Coverage Details for supported regions.
search mode

Search mode displays results for a search across the visible map region. It's recommended that a location for the search be defined, either by including a location in the search term (record+stores+in+Seattle) or by including a center and zoom parameter to bound the search.



https://www.google.com/maps/embed/v1/search
  ?key=YOUR_API_KEY
  &q=record+stores+in+Seattle
You can use the following parameters:

Parameter	Type	Description	Accepted values
q	Required	Defines the search term.	It can include a geographic restriction, such as in+Seattle or near+98033.
center	Optional	Defines center of the map view.	Accepts comma-separated latitude and longitude value; for example: 37.4218,-122.0840.
zoom	Optional	Sets initial zoom level of the map.	Values ranging from 0 (the whole world) to 21 (individual buildings). The upper limit can vary depending on the map data available at the selected location.
maptype	Optional	Defines type of map tiles to load.	roadmap (default) or satellite
language	Optional	Defines the language to use for UI elements and for the display of labels on map tiles. By default, visitors will se a map in their own language. This parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.
region	Optional	Defines the appropriate borders and labels to display, based on geo-political sensitivities.	Accepts a region code specified as a two-character (non-numeric) unicode region subtag mapping to familiar ccTLD ("top-level domain") two-character values. See Google Maps Platform Coverage Details for supported regions.
Place ID parameters

The Maps Embed API supports using place IDs instead of supplying a place name or address. Place IDs are stable way to uniquely identify a place. For more information, see the Google Places API documentation.

The Maps Embed API accepts place IDs for the following URL parameters:

q
origin
destination
waypoints
In order to use a place ID, you must first add the prefix place_id:. The following code specifies New York City Hall as the origin for a directions request: origin=place_id:ChIJs--MqP1YwokRBwAhjXWIHn8.

radius sets a radius, specified in meters, in which to search for a panorama, centered on the given latitude and longitude. Valid values are non-negative integers. Default value is 50.
source limits Street View searches to selected sources. Valid values are:

default uses the default sources for Street View; searches are not limited to specific sources.
outdoor limits searches to outdoor collections. Indoor collections are not included in search results. Note that outdoor panoramas may not exist for the specified location. Also note that the search only returns panoramas where it's possible to determine whether they're indoors or outdoors. For example, PhotoSpheres are not returned because it's unknown whether they are indoors or outdoors.
Was this helpful?

Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-03-26 UTC.

 Stack Overflow Stack Overflow
Ask a question under the google-maps tag.
 GitHub GitHub
Fork our samples and try them yourself.
 Discord Discord
Chat with fellow developers about Google Maps Platform.
 Issue Tracker Issue Tracker
Something wrong? Send us a bug report!
Learn More
FAQ
API Picker
API security best practices
Optimizing Web Service Usage
Platforms
Android
iOS
Web
Web Services
Product Info
Pricing and Plans
Contact Sales
Support
Terms of Service
Google Developers
Android
Chrome
Firebase
Google Cloud Platform
Google AI
All products
Terms
Privacy
Sign up for the Google for Developers newsletter
Subscribe

English
The new page has loaded.