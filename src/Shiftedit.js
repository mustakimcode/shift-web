import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import moment from "moment";

class ShiftEdit extends Component {
  emptyShift = {};

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyShift,
      mode: "new",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      fetch(`${this.props.match.params.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({ item: data }));
      console.log(this.state.item);
      this.state.mode = "edit";
    } else {
      this.state.mode = "new";
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    // if (!this.checkShiftTime()) {
    //   alert("End time must be greater than start time!!");
    // } else {
    await fetch("/add", {
      method: this.state.mode === "edit" ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/");
    // }
  }

  checkShiftTime() {
    var start_time = moment(this.state.shift_start_time, "HH:mm");
    var end_time = moment(this.state.shift_end_time, "HH:mm");

    console.log(start_time);
    console.log(end_time);
    if (end_time > start_time) {
      return true;
    }
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit Shift" : "Add Shift"}</h2>;

    return (
      <div>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">User Name</Label>
              <Input
                type="text"
                name="shift_user_name"
                id="name"
                value={this.state.mode !== "new" ? item.shift_user_name : null}
                onChange={this.handleChange}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="start">Date</Label>
              <Input
                type="date"
                name="shift_date"
                id="date"
                value={this.state.mode !== "new" ? item.shift_date : null}
                onChange={this.handleChange}
                autoComplete="date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="start">Start Hour</Label>
              <Input
                type="time"
                name="shift_start_time"
                id="start"
                value={this.state.mode !== "new" ? item.shift_start_time : null}
                onChange={this.handleChange}
                autoComplete="start"
              />
            </FormGroup>
            <FormGroup>
              <Label for="end">End Hour</Label>
              <Input
                type="time"
                name="shift_end_time"
                id="end"
                value={this.state.mode !== "new" ? item.shift_end_time : null}
                onChange={this.handleChange}
                autoComplete="end"
              />
            </FormGroup>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(ShiftEdit);
