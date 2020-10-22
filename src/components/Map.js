import React, {Component} from "react";
import {Entity, PolygonGraphics, Viewer} from "resium";
import {Rectangle, Cartesian2, Cartesian3, Color, Math, ArcGisMapServerImageryProvider} from "cesium";
import CSVReader from "react-csv-reader";
import {exportObjects} from "../util/csv";
import swal from 'sweetalert';

const esri = new ArcGisMapServerImageryProvider({
  url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
});

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEntity: {
        points: []
      },
      entities: [],
      data: []
    }
  }

  importData = (data, _) => {
    console.log(data)

    try {
      const parsed = []
      for (let row of data) {
        if (row.values !== "") {
          let parsedRow = JSON.parse(row.value)
          parsed.push(parsedRow)
        }
      }

      this.setState({data: parsed}, () => console.log(this.state.data))
    } catch (e) {
      console.log("error importing data", e.message)
    }
  }

  componentDidMount() {
    this.viewer.scene.camera.flyTo({
      destination : Rectangle.fromDegrees(119.83743, -0.9116697, 119.85452, -0.895846),
    });
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
      },
      data: [...this.state.data, {long, lat}],
    }, () => console.log(this.state.data))
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
        cancel: "Oh noez!"
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
    // console.log(this.state)
    const {currentEntity, entities} = this.state
    const points = currentEntity.points || []

    return (
      <div>
        <div>
          <CSVReader
            parserOptions={{header: true}}
            onFileLoaded={this.importData}
          />
        </div>
        <div>
          <button onClick={() => exportObjects(entities, "export.csv")}>Export data</button>
        </div>
        <Viewer full
                style={{position: "relative"}}
                ref={e => {
                  this.viewer = e ? e.cesiumElement : null;
                }}
                imageryProvider={esri}
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
      </div>
    )
  }
}
