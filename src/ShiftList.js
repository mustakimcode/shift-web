import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

class ShiftList extends Component {
  constructor(props) {
    super(props);
    this.state = { shifts: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("shifts")
      .then((response) => response.json())
      .then((data) => this.setState({ shifts: data, isLoading: false }));
  }

  async remove(id) {
    // eslint-disable-next-line no-restricted-globals
    let r = confirm("Are you sure wan tu delete this?");
    if (r === true) {
      await fetch(`shift/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "applition/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        let updatedshifts = [...this.state.shifts].filter((i) => i._id !== id);
        this.setState({ shifts: updatedshifts });
      });
    }
  }

  async publish(id) {
    await fetch(`shift/publish/${id}`, {
      method: "POST",
      headers: {
        Accept: "applition/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      this.componentDidMount();
    });
  }

  render() {
    const { shifts, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const shiftList = shifts.map((shift) => {
      let is_publish_key = (
        <Button
          size="sm"
          color="success"
          disabled={shift.shift_is_published}
          onClick={() => this.publish(shift._id)}
        >
          {shift.shift_is_published ? "Published" : "Publish"}
        </Button>
      );
      return (
        <tr key={shift._id}>
          <td>{moment(shift.shift_date).format("L")}</td>
          <td style={{ whiteSpace: "nowrap" }}>{shift.shift_start_time}</td>
          <td>{shift.shift_end_time}</td>
          <td>{shift.shift_user_name}</td>
          <td>{is_publish_key}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                disabled={shift.shift_is_published}
                to={"/shifts/" + shift._id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(shift._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/shifts/new">
              Add Shift
            </Button>
          </div>
          <h3>Shift List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Date</th>
                <th width="20%">Start</th>
                <th width="20%">End</th>
                <th width="10%">Name</th>
                <th width="10%">Published</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{shiftList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ShiftList;
