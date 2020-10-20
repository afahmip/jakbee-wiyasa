import React, {Component} from "react";
import {Entity, PolygonGraphics, Viewer} from "resium";
import {Cartesian3, Cartesian2, Math, Color} from "cesium";

export class Map extends Component {
  getLocationFromScreenXY = (x, y) => {
    const scene = this.viewer.scene
    if (!scene) {
      return
    }

    const ellipsoid = scene.globe.ellipsoid;
    const cartesian = scene.camera.pickEllipsoid(new Cartesian2(x, y), ellipsoid);
    if (!cartesian) {
      return
    }

    return ellipsoid.cartesianToCartographic(cartesian);
  }

  onMapClick = (event, _) => {
    const coords = this.getLocationFromScreenXY(event.position.x, event.position.y);
    const lat = Math.toDegrees(coords.latitude)
    const long = Math.toDegrees(coords.longitude)

    console.log({lat, long})
  }

  render() {
    return (
      <Viewer full
              ref={e => {
                this.viewer = e ? e.cesiumElement : null;
              }}
              onClick={this.onMapClick}
      >
        <Entity>
          <PolygonGraphics
            hierarchy={Cartesian3.fromDegreesArray([
              115.0664319,-8.127787,
              115.0662681,-8.1275414,
              115.0664451,-8.1274293,
              115.0666148,-8.1276916
            ])}
            height={10}
            material={Color.RED.withAlpha(0.5)}
            outline={true}
            outlineColor={Color.BLACK}
          />
        </Entity>
      </Viewer>
    )
  }
}
