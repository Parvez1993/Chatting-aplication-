import React, { Component } from "react";
import { Icon, Modal, Button, Form, Progress } from "semantic-ui-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  push,
  ref as refer,
  set,
  child,
} from "@firebase/database";

export default class ModalComponent extends Component {
  state = {
    file: "",
    progress: "",
  };
  uploadImage = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = () => {
    if (this.state.file) {
      const storage = getStorage();
      const storageRef = ref(storage, `files/${this.state.file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, this.state.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressbar = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          this.setState({ progress: progressbar });
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const db = getDatabase();
            const postListRef = refer(db, "files");
            const newPostRef = push(
              child(postListRef, `${this.props.groupName.id}`)
            );
            set(newPostRef, {
              fileurl: url,
              date: Date(),
              sender: this.props.userName.uid,
              group: this.props.groupName.id,
              username: this.props.userName.displayName,
            }).then(() => {
              this.props.close();
              this.setState({ progress: "" });
            });
          });
        }
      );
    } else {
      console.log("file nai");
    }
  };
  render() {
    console.log(this.props.groupName, this.props.userName);
    return (
      <>
        <Modal basic open={this.props.modal} size="small">
          <Modal.Content>
            <Form>
              <Form.Field>
                <label style={{ color: "white" }}>Group Name</label>
                <input
                  type="file"
                  name="image"
                  placeholder="Upload an Image"
                  onChange={this.uploadImage}
                />
              </Form.Field>
              {this.state.progress ? (
                ""
              ) : (
                <Progress percent={this.state.progress} success>
                  Loading Image
                </Progress>
              )}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={this.props.close}>
              <Icon name="remove" /> Cancel
            </Button>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add Image
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
