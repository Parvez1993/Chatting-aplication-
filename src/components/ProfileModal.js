import React, { Component } from "react";
import { Icon, Modal, Button, Form, Progress } from "semantic-ui-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  getDatabase,
  push,
  ref as refer,
  set,
  child,
} from "@firebase/database";
import { updateProfile } from "firebase/auth";
export default class ProfileModal extends Component {
  state = {
    file: "",
    progress: "",
  };

  uploadImage = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = () => {
    console.log(this.props.userName);
  };

  handleSubmit = () => {
    if (this.state.file) {
      const storage = getStorage();
      const storageRef = ref(storage, `users/${this.props.username.uid}`);

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
            const postListRef = refer(db, "userProfile");
            const newPostRef = push(
              child(postListRef, `${this.props.username.uid}`)
            );
            set(newPostRef, {
              profileImage: url,
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
    console.log("pic", this.props.username.uid);
    return (
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={this.props.close}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" inverted onClick={this.handleSubmit}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
