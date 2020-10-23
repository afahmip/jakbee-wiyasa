import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import classNames from 'classnames';

class ActiveHour extends React.Component {
  state = {
    hours: [
      [1, 4, 6, 4, 1],
      [1, 5, 7, 1, 1],
      [1, 4, 7, 5, 1],
      [1, 3, 6, 7, 2],
      [2, 4, 6, 4, 1],
      [1, 1, 1, 1, 1],
    ]
  };

  render() {
    return (
      <Card small className="h-100 card-worker mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Active Hours</h6>
        </CardHeader>
        <CardBody className="py-1">
          <div className="workgraph">
            {this.state.hours.map((day, i) => (
              <div key={i} className="workgraph__day">
                {day.map((hour, j) => (
                  <div key={j} className={classNames('workgraph__hour', `workgraph__hour-${hour}`)} />
                ))}
              </div>
            ))}
            <div className="hourrange">
              <span>6-9 AM</span>
              <span>9-12 AM</span>
              <span>12-3 PM</span>
              <span>3-6 PM</span>
              <span>6-9 PM</span>
            </div>
          </div>
          <div className="days">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
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

export default ActiveHour;