import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/MainNavbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

const DefaultLayout = ({ children, noNavbar, noFooter }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

  return (
    <Container fluid>
      <Row>
        <MainSidebar mobileMenuVisible={mobileMenuVisible} />
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!noNavbar && <MainNavbar onToggle={() => setMobileMenuVisible(true)} />}
          <Container fluid className="main-content-container px-5">
            {children}
          </Container>
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  )
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
