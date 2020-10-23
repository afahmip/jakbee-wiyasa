import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

class WorkerCount extends React.Component {
  state = {
    total: 0,
    locations: [
      {
        name: 'Construction Site A',
        amount: 56,
        color: '#FF7B01',
      },
      {
        name: 'Construction Site B',
        amount: 45,
        color: '#DB2319',
      },
      {
        name: 'Construction Site C',
        amount: 24,
        color: '#00BE8F',
      },
      {
        name: 'Construction Site D',
        amount: 31,
        color: '#333377',
      },
      {
        name: 'Cafeteria',
        amount: 11,
        color: '#00AEEF',
      }
    ]
  };

  componentDidMount() {
    let total = 0;
    this.state.locations.forEach(loc => {
      total += loc.amount;
    });
    this.setState({total});
  }

  render() {
    return (
      <Card small className="h-100 card-worker">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Worker Count</h6>
        </CardHeader>
        <CardBody className="py-1">
          <div className="worker-count">
            <div className="worker-count__num">
              <p>{this.state.total}</p>
            </div>
            <div className="worker-count__stats">
              {this.state.locations.map((loc, i) => (
                <div key={i} className="worker-count__stats__item">
                  <div style={{backgroundColor: loc.color}} />
                  <span>{loc.name} :&nbsp;</span>
                  <span>{loc.amount} workers</span>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col />
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    )
  }
}

export default WorkerCount;