import React, { Component } from "react";
import { connect } from "react-redux";

// Used for rendering markdowns
import marked from "marked";
import renderHTML from "react-render-html";

// Style
import Spinner from "react-bootstrap/Spinner";

// action Creators
import { getAllActivitiesASYNC } from "../../redux/activities/activities.actions";
import "./activities.styles.scss";
class Activities extends Component {
  componentDidMount() {
    this.props.getAllActivitiesASYNC();
  }

  render() {
    const { activities, isFetchingActivities } = this.props;
    return (
      <div className="container " className="activities-section">
        <div className="row">
          <h2 className="ml-5">Activities</h2>
        </div>
        <div className="row p-2 pb-5">
          {isFetchingActivities ? (
            <div className="mt-5 col-12">
              <Spinner animation="border" variant="info" />
            </div>
          ) : (
            <div className="col-12">
              <div className="list-group">
                {activities &&
                  activities.reverse().map(activity => (
                    <div
                      className="activtity-items list-group-item text-dark d-flex"
                      key={activity._id}
                    >
                      <img
                        src={
                          activity.userId.avatarUrl
                            ? activity.userId.avatarUrl
                            : this.props.user.avatarUrl
                        }
                        alt="userPhoto"
                        width="50"
                        height="50"
                        style={{ borderRadius: "50%", marginRight: "1em" }}
                      />
                      {renderHTML(marked(activity.text))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  activities: state.board.activities.activities,
  isFetchingActivities: state.board.activities.isFetchingActivities
});

const mapDispatchToProps = dispatch => ({
  getAllActivitiesASYNC: () => dispatch(getAllActivitiesASYNC())
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
