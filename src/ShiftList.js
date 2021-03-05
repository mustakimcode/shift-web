import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

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
    await fetch(`Shift/shift/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedshifts = [...this.state.shifts].filter((i) => i.id !== id);
      this.setState({ shifts: updatedshifts });
    });
  }

  render() {
    const { shifts, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const shiftList = shifts.map((shift) => {
      return (
        <tr key={shift.id}>
          <td style={{ whiteSpace: "nowrap" }}>{shift.firstname}</td>
          <td>{shift.lastname}</td>
          <td>{shift.age}</td>
          <td>{shift.address}</td>
          <td>
            <a href={shift.copyright}>{shift.copyright}</a>
          </td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/shifts/" + shift.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(shift.id)}
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
        <AppNavbar />
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
                <th width="20%">Firstname</th>
                <th width="20%">Lastname</th>
                <th width="10%">Age</th>
                <th>Address</th>
                <th>Copyrightby</th>
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
