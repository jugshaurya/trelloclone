import React, { Component } from "react";
import { connect } from "react-redux";

// Used for rendering markdowns
import marked from "marked";
import renderHTML from "react-render-html";

// Style
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// action Creators
import { getAllActivitiesASYNC } from "../../redux/activities/activities.actions";

class Activities extends Component {
  componentDidMount() {
    this.props.getAllActivitiesASYNC();
  }

  render() {
    const { activities, isFetchingActivities } = this.props;
    return (
      <Container className="activiies-section">
        <Row>
          <h2>Activities</h2>
        </Row>
        <Row>
          {isFetchingActivities ? (
            <Col className="mt-5 col-12">
              <Spinner animation="border" variant="info" />
            </Col>
          ) : (
            <Col>
              <ListGroup>
                {activities &&
                  activities.map(activity => (
                    <ListGroup.Item key={activity._id}>
                      {renderHTML(marked(activity.text))}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.board.activities.activities,
  isFetchingActivities: state.board.activities.isFetchingActivities
});

const mapDispatchToProps = dispatch => ({
  getAllActivitiesASYNC: () => dispatch(getAllActivitiesASYNC())
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
