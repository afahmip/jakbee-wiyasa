import React from "react";
import { Row, Col } from "shards-react";

import PageTitle from "../../components/PageTitle";
import {FloodMap} from "../../components/FloodMap";
import Weather from "../../components/Weather";
import "./style.css";

class FloodOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waterLevel: 0,
    }
  }

  changeWaterLevel = (newWaterLevel) => {
    this.setState({
      waterLevel: newWaterLevel,
    })
  }

  render() {
    return (
      <>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Before and After Assessment"
            subtitle="Historical Disaster Overview"
            className="text-sm-left mb-3"/>
        </Row>

        <Row>
          <div className="weather-container">
            <Weather changeWaterLevel={this.changeWaterLevel}/>
          </div>
          <FloodMap waterLevel={this.state.waterLevel}/>
        </Row>
      </>
    )
  }
}

export default FloodOverview;
