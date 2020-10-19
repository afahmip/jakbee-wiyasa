import React from "react";
import {Viewer, Entity, PolygonGraphics} from "resium";
import {hot} from "react-hot-loader/root";
import {Cartesian3, Color} from "cesium";

const App = () => (
    <Viewer full>
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
;

export default hot(App);
