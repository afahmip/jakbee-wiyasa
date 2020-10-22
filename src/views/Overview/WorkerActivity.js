import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

class WorkerActivity extends React.Component {
  state = {
    workers: [
      {
        initial: 'JJ',
        name: 'Jonathan James',
        activity: 'Plastering',
        heart: 145,
      },
      {
        initial: 'AG',
        name: 'Abdul Gaffar',
        activity: 'Resting',
        heart: 90,
      },
      {
        initial: 'JM',
        name: 'Juan Monero',
        activity: 'Resting',
        heart: 82,
      },
      {
        initial: 'WF',
        name: 'Wang Fang',
        activity: 'Tie Rebar',
        heart: 120,
      },
      {
        initial: 'ZW',
        name: 'Zhang Wei',
        activity: 'Plastering',
        heart: 111,
      },
      {
        initial: 'RR',
        name: 'Reno Riviera',
        activity: 'Drilling',
        heart: 120,
      },
    ]
  }

  componentDidMount() {
    setInterval(() => {
      let newWorkers = [...this.state.workers];
      const random = (Math.random() - 0.5) * 2;
      newWorkers.forEach(w => {
        w.heart = Math.floor(w.heart + random);
      });
      this.setState({workers: newWorkers});
    }, 2000);
  }

  render() {
    return (
      <Card small className="card-worker">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Worker Activities</h6>
        </CardHeader>
        <CardBody className="py-1">
          {this.state.workers.map((w, i) => (
            <div className="worker-item" key={i}>
              <div>{w.initial}</div>
              <div>
                <p className="worker-item__name">{w.name}</p>
                <p className="worker-item__activity">
                  Recent activity:&nbsp;
                  <span>{w.activity}</span>
                </p>
              </div>
              <div>
                <span>{w.heart} bpm</span>
                <i
                  className="material-icons"
                  style={w.activity !== 'Resting' ? {color: 'red'} : null}>
                  favorite
                </i>
              </div>
            </div>
          ))}
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
    );
  }
}

export default WorkerActivity;
