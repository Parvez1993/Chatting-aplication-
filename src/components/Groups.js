import { getDatabase, onValue, push, ref, set } from "@firebase/database";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  Icon,
  Modal,
  Button,
  Form,
  Message,
  Menu,
} from "semantic-ui-react";
import { setcurrentgroup } from "../redux/actions";

class Groups extends Component {
  state = {
    groups: [],
    modal: false,
    groupname: "",
    grouptagline: "",
    err: "",
    active: "",
    firstload: true,
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleFormInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      const db = getDatabase();
      const postListRef = ref(db, "groups");
      const newPostRef = push(postListRef);
      set(newPostRef, {
        groupname: this.state.groupname,
        grouptagline: this.state.grouptagline,
        createdBy: this.props.userName,
      }).then(() => {
        this.setState({ groupname: "" });
        this.setState({ grouptagline: "" });
        this.setState({ err: "" });
        this.setState({ modal: false });
      });
    } else {
      this.setState({ err: "Fields cannot  be empty" });
    }
  };

  isFormValid({ groupname, grouptagline }) {
    if (groupname.length < 1) {
      this.setState({ err: "groupname cannot be empty" });
    } else if (grouptagline.length < 1) {
      this.setState({ err: "grouptagline cannot be empty" });
    } else if (!groupname && !grouptagline) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    let groupsafterLoad = [];
    const db = getDatabase();
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        let groupData = {
          id: item.key,
          groupname: item.val().groupname,
          grouptagline: item.val().grouptagline,
          createdby: item.val().createdBy,
        };
        groupsafterLoad.push(groupData);
      });
      this.setState({ groups: groupsafterLoad }, this.addgroupload);
    });
  }

  //preload the group

  addgroupload = () => {
    let firstGroup = this.state.groups[0];
    if (this.state.firstload && this.state.groups.length > 0) {
      this.props.setcurrentgroup(firstGroup);
      this.setState({ active: firstGroup.id });
    }
    this.setState({ firstload: false });
  };

  groupChange = (group) => {
    this.props.setcurrentgroup(group);
    this.setState({ active: group.id });
  };
  render() {
    return (
      <>
        <div className="main">
          <div>
            <Header
              as="h3"
              style={{
                color: "white",
                marginTop: "40px",
              }}
            >
              <Icon name="group" />
              Groups ({this.state.groups.length})
            </Header>
            <Menu
              text
              vertical
              style={{ padding: "0px 20px", fontSize: "18px" }}
            >
              <Menu.Item header style={{ color: "white" }}>
                Sort By
              </Menu.Item>
              {this.state.groups.map((item, index) => (
                <Menu.Item
                  className={
                    item.id === this.state.active
                      ? "menu_item active"
                      : "menu_item"
                  }
                  onClick={() => {
                    this.groupChange(item);
                  }}
                >
                  {item.groupname}
                </Menu.Item>
              ))}
            </Menu>
          </div>
          <div>
            <Header as="h3" style={{ color: "white", marginTop: "40px" }}>
              <Modal
                basic
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.modal}
                size="small"
                trigger={<Icon name="add circle" onClick={this.openModal} />}
              >
                <Modal.Content>
                  {this.state.err ? (
                    <Message negative>
                      <Message.Header>{this.state.err}</Message.Header>
                    </Message>
                  ) : (
                    ""
                  )}
                  <Form>
                    <Form.Field
                      error={this.state.err.includes("name") ? true : false}
                    >
                      <label style={{ color: "white" }}>Group Name</label>
                      <input
                        type="text"
                        name="groupname"
                        placeholder="Create a gossip club"
                        onChange={this.handleFormInput}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label style={{ color: "white" }}>Group Tagline</label>
                      <input
                        type="text"
                        name="grouptagline"
                        placeholder="Let gossipers know the topic"
                        onChange={this.handleFormInput}
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic color="red" inverted onClick={this.closeModal}>
                    <Icon name="remove" /> Cancel
                  </Button>
                  <Button color="green" inverted onClick={this.handleSubmit}>
                    <Icon name="checkmark" /> Add Group
                  </Button>
                </Modal.Actions>
              </Modal>
            </Header>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { setcurrentgroup })(Groups);
