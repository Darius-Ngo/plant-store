import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"
const options = { closeBoxURL: "", enableEventPropagation: true }
const Contact = () => {
  return (
    <GoogleMap
      defaultZoom={20}
      defaultCenter={{ lat: 21.307057, lng: 105.578908 }}
    >
      <Marker
        icon={{
          url: "https://www.clipartmax.com/png/middle/118-1182314_red-address-icon-red-png.png",
          scaledSize: new window.google.maps.Size(50, 40),
        }}
        position={{ lat: 21.307057, lng: 105.578908 }}
      >
        <InfoBox options={options}>
          <>
            <div
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "1em",
                padding: "0.2em",
              }}
            >
              Công đoàn y tế Việt Nam
            </div>
          </>
        </InfoBox>
      </Marker>
    </GoogleMap>
  )
}
export default withScriptjs(withGoogleMap(Contact))
