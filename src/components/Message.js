import React, { Component } from "react";
import { Comment, Image, Segment } from "semantic-ui-react";
import MessageHeader from "./Message/MessageHeader";
import MessageForm from "./MessageForm";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onValue,
} from "firebase/database";
import moment from "moment";

export default class Message extends Component {
  state = {
    groupMsg: [],
    groupFiles: [],
    typing: [],
  };

  componentDidMount() {
    let arr = [];
    const db = getDatabase();
    const groupRef = ref(db, "typing");
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        let groupData = {
          typing: item.val().typing,
          sender: item.val().sender,
          username: item.val().username,
          groupId: item.val().groupId,
        };
        arr.push(groupData);
      });
      this.setState({ typing: arr });
    });
  }

  componentDidUpdate(previousProps) {
    let arr = [];
    const db = getDatabase();
    const commentsRef = ref(db, "messages/");
    onChildAdded(commentsRef, (data) => {
      console.log("clicked onchild added");
      data.forEach((item) => {
        arr.push(item.val());
      });
      console.log(arr);
      if (previousProps.groupName) {
        if (
          previousProps.groupName.groupname !== this.props.groupName.groupname
        ) {
          this.setState({ groupMsg: arr });
          console.log("sssss");
        }
      } else {
        this.setState({ groupMsg: arr });
      }
    });
    onChildChanged(commentsRef, (data) => {
      console.log("clicked onchild removed added");
      let arr = [];
      data.forEach((item) => {
        arr.push(item.val());
      });
      if (previousProps.groupName) {
        if (
          previousProps.groupName.groupname !== this.props.groupName.groupname
        ) {
          this.setState({ groupMsg: arr });
          console.log("sssss");
        }
      } else {
        this.setState({ groupMsg: arr });
      }
    });

    //for images upload

    // ============================image =============

    let filearr = [];
    const fileRef = ref(db, "files/");
    onChildAdded(fileRef, (data) => {
      data.forEach((item) => {
        filearr.push(item.val());
      });
      if (previousProps.groupName) {
        if (
          previousProps.groupName.groupname !== this.props.groupName.groupname
        ) {
          this.setState({ groupFiles: filearr });
        }
      } else {
        this.setState({ groupFiles: filearr });
      }
    });
    onChildChanged(fileRef, (data) => {
      let filearr = [];
      data.forEach((item) => {
        filearr.push(item.val());
      });
      if (previousProps.groupName) {
        if (
          previousProps.groupName.groupname !== this.props.groupName.groupname
        ) {
          this.setState({ groupFiles: filearr });
        }
      } else {
        this.setState({ groupFiles: filearr });
      }
    });
  }

  filtertypinguser = () => {
    const temp = this.state.typing
      .filter((item) => item.sender !== this.props.userName.uid)
      .map((i) => i.username);

    if (temp[0] === undefined) {
      return 0;
    } else {
      return temp[0];
    }
  };

  render() {
    console.log(this.state.groupFiles);
    let temp = null;

    console.log(temp);
    return (
      <div>
        <Segment>
          <MessageHeader />
        </Segment>
        {/* {this.state.typing ? this.filtertypinguser() : ""} */}
        {this.state.typing
          .filter((item) => item.sender !== this.props.userName.uid)
          .map((i) => i.username)
          ? ` ${this.state.typing
              .filter((item) => item.sender !== this.props.userName.uid)
              .map((i) => i.username)} is typing`
          : ""}
        {console.log("aaaaa", this.state.typing)}
        <Segment style={{ height: "200px", overflowY: "scroll" }}>
          <Comment.Group>
            {this.state.groupMsg.map((i) =>
              i.group === this.props.groupName.id ? (
                <div>
                  <Comment
                    style={i.sender === this.props.userName.uid ? left : right}
                  >
                    <Comment.Content>
                      <Comment.Author as="a">
                        {i.username ? i.username : "user"}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>{moment(i.date).fromNow()}</div>
                      </Comment.Metadata>
                      <Comment.Text>{i.message}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                </div>
              ) : (
                ""
              )
            )}

            {/* image condition  */}

            {this.state.groupFiles.map((i) =>
              i.group === this.props.groupName.id ? (
                <div>
                  <Comment
                    style={i.sender === this.props.userName.uid ? left : right}
                  >
                    <Comment.Content>
                      <Comment.Author as="a">
                        {i.username ? i.username : "user"}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>{moment(i.date).fromNow()}</div>
                      </Comment.Metadata>
                      <Comment.Text>
                        <Image src={i.fileurl} size="small" />
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                </div>
              ) : (
                ""
              )
            )}
          </Comment.Group>
        </Segment>
        <Segment>
          <MessageForm
            userName={this.props.userName}
            groupName={this.props.groupName}
          />
        </Segment>
      </div>
    );
  }
}

let left = {
  display: "flex",
  justifyContent: "flex-end",
};
let right = {
  display: "flex",
  justifyContent: "flex-start",
};
