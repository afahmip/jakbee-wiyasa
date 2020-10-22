import React from "react";
import { Row, Col } from "shards-react";

import PageTitle from "../../components/PageTitle";
import {Map} from "../../components/Map";

class Overview extends React.Component {
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
          <Map />
        </Row>
      </>
    )
  }
}

export default Overview;
