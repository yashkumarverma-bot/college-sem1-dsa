import React from "react";
import { connect } from "react-redux";

// load dependents

const SessionDetailsCard = ({ activeSession }) => (
  <div>
    {activeSession ? (
      <div className="card  bg-light">
        <div className="card-body">
          <h5 className="card-title">Session Details</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            listing details of session
          </h6>
          {console.log(activeSession)}

          {activeSession.participants.length ? (
            <small>showing list of participants</small>
          ) : (
            <small>No one logged till now</small>
          )}

          <ul className="list-group">
            {activeSession.participants.map((participant) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {participant.name}
                <span
                  className={
                    "badge badge-pill " +
                    (participant.late ? "badge-danger" : "badge-success")
                  }
                >
                  {participant.late ? "late" : "in-time"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : null}
  </div>
);

const mapStateToProps = (state) => {
  return {
    activeSession: state.activeSession,
  };
};

export default connect(mapStateToProps)(SessionDetailsCard);
