import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import Chart from "../../components/Chart";

class ActivityStats extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartConfig = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [30, 20, 45, 15, 21, 34, 19],
          backgroundColor: [
            "#00AEEF",
            "#0F3177",
            "#00BE8F",
            "#FF7B01",
            "#DB2319",
            '#333377',
            '#CBCBCB'
          ]
        }],
        labels: ['Lay brick', 'Drilling', 'Shoveling', 'Plastering', 'Welding', 'Tie rebar', 'Others'],
      },
      options: {
        responsive: true,
        legend: {
          position: 'right'
        }
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    return (
      <Card small className="card-worker h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Activity Stats</h6>
        </CardHeader>
        <CardBody className="py-1">
          <canvas
            height="160"
            ref={this.canvasRef}
          />
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

export default ActivityStats;
