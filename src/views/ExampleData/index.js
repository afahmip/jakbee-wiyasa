import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Col, Row, Form, FormInput } from "shards-react";
import ReactTable from 'react-table';

import "react-table/react-table.css";
import "react-quill/dist/quill.snow.css";
import PageTitle from "../../components/PageTitle";

const columns = [{
  Header: '#',
  accessor: 'id',
  maxWidth: 50
}, {
  Header: 'Name',
  accessor: 'name',
}, {
  Header: 'Divison',
  accessor: 'division',
}, {
  Header: 'Total Workhours',
  accessor: 'workhours',
}, {
  Header: 'Status',
  accessor: 'status',
  Cell: (d) => {
    return (
      <div>
        {d.original.status && (<div>Active</div>)}
        {!d.original.status && (<div>Not Active</div>)}
      </div>
    )
  }
}];

class ExampleData extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      isTransfering: false,
      title: this.props.title,
      cameraDetail: null,
      cameraDetails: [
        {
          id: 1,
          name: 'Jonathan James',
          division: 'Lorem Ipsum',
          workhours: 160,
          status: true
        },
        {
          id: 2,
          name: 'Reno Riviera',
          division: 'Lorem Ipsum',
          workhours: 155,
          status: true
        },
        {
          id: 3,
          name: 'Abdul Gaffar',
          division: 'Lorem Ipsum',
          workhours: 145,
          status: true
        },
        {
          id: 4,
          name: 'Juan Monero',
          division: 'Lorem Ipsum',
          workhours: 160,
          status: true
        },
      ],
    }
  }

  render() {
    const { cameraDetails } = this.state;

    return (
      <>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Example 1" subtitle="Components" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="6" md="6" sm="12">
            <Card small className="mb-4">
              <CardBody className="p-0">
                <ReactTable
                  className="p-0"
                  data={cameraDetails}
                  columns={columns}
                  defaultPageSize={10}
                  getTdProps={(state, rowInfo, column, instance) => {
                    if (rowInfo && rowInfo.row && column.Header !== 'Actions') {
                      return {
                        onClick: (e) => {
                          console.log(rowInfo.index);
                        },
                      }
                    } else {
                      return {}
                    }
                  }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Card small className="mb-3">
              <CardBody>
                <Form className="add-new-post">
                  <FormInput size="lg" className="mb-3" placeholder="Your Post Title" />
                  <ReactQuill className="add-new-post__editor mb-1" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    ) ;
  }
}

export default ExampleData;
