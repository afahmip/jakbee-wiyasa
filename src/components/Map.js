import React, {Component} from "react";
import {Entity, PolygonGraphics, Viewer} from "resium";
import {Cartesian2, Cartesian3, Color, Math} from "cesium";

import swal from 'sweetalert';

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEntity: {
        points: []
      },
      entities: []
    }
  }

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

    const points = [...this.state.currentEntity.points, [long, lat]]
    this.setState({
      ...this.state,
      currentEntity: {
        ...this.state.currentEntity,
        points: points
      }
    })
  }

  clearCurrentEntity = () => {
    this.setState({
      ...this.state,
      currentEntity: {
        points: []
      }
    })
  }

  isBuildingDamaged = async () => {
    const answer = await swal("Is this building damageedsz?", {
      buttons: {
        yes: "Aww yiss!",
        no: "Oh noez!"
      }
    });

    return answer === "yes"
  }

  saveSelection = async () => {
    const {currentEntity} = this.state
    this.clearCurrentEntity()

    currentEntity["isDamaged"] = await this.isBuildingDamaged()
    currentEntity["points"] = currentEntity.points.reduce((total, curr) => {
      return total.concat(curr);
    })
    this.setState({
      ...this.state,
      entities: [...this.state.entities, currentEntity]
    })
  }

  render() {
    const {currentEntity, entities} = this.state
    const points = currentEntity.points || []

    return (
      <Viewer full
              ref={e => {
                this.viewer = e ? e.cesiumElement : null;
              }}
              onClick={this.onMapClick}
      >
        <button style={{left: '250px', top: '95px', position: 'fixed'}}
                onClick={() => this.saveSelection()}>
          Save Polygon
        </button>
        {points.map((point, index) => {
          return (
            <Entity
              key={index}
              position={Cartesian3.fromDegrees(point[0], point[1])}
              point={{pixelSize: 5}}
            />
          )
        })}
        {entities.map((entity, index) => {
          return (
            <Entity>
              <PolygonGraphics
                hierarchy={Cartesian3.fromDegreesArray(entity["points"])}
                height={5}
                material={entity["isDamaged"] ? Color.RED.withAlpha(0.5) : Color.GREEN.withAlpha(0.5)}
              />
            </Entity>
          )
        })}
      </Viewer>
    )
  }
}
