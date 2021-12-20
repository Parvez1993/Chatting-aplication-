import React, { Component } from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessageHeader from "./Message/MessageHeader";
import MessageForm from "./MessageForm";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import moment from "moment";

export default class Message extends Component {
  state = {
    groupMsg: [],
  };
  componentDidUpdate(previousProps) {
    let arr = [];
    const db = getDatabase();
    const commentsRef = ref(db, "messages/");
    onChildAdded(commentsRef, (data) => {
      data.forEach((item) => {
        arr.push(item.val());
      });
      if (previousProps.groupName) {
        if (
          previousProps.groupName.groupname !== this.props.groupName.groupname
        ) {
          this.setState({ groupMsg: arr });
        }
      } else {
        this.setState({ groupMsg: arr });
      }
    });
    onChildChanged(commentsRef, (data) => {
      let arr = [];
      data.forEach((item) => {
        arr.push(item.val());
      });
      if (previousProps.groupName) {
        if (
          previousProps.groupName.groupname !== this.props.groupName.groupname
        ) {
          this.setState({ groupMsg: arr });
        }
      } else {
        this.setState({ groupMsg: arr });
      }
    });
  }

  render() {
    return (
      <div>
        <Segment>
          <MessageHeader />
        </Segment>

        <Segment style={{ height: "200px", overflowY: "scroll" }}>
          <Comment.Group>
            {this.state.groupMsg.map((i) =>
              i.group === this.props.groupName.id ? (
                <div>
                  {i.sender === this.props.userName.uid ? (
                    // <p style={{ textAlign: "right" }}>{i.message}</p>
                    <Comment style={{ textAlign: "right" }}>
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
                  ) : (
                    <Comment>
                      <Comment.Content>
                        <Comment.Author as="a">
                          {i.userName ? i.userName : "user"}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{moment(i.date).fromNow()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{i.message}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  )}
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
