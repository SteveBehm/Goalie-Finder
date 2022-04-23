import React from 'react';
import { io } from 'socket.io-client';
import { Container, Row, Card } from 'react-bootstrap';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: [],
      newMsgContent: ''
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chatContainer = React.createRef();
  }

  componentDidMount() {
    const to = this.props.to;

    this.socket = io.connect('/chat', {
      auth: {
        token: window.localStorage.getItem('react-context-jwt')
      },
      query: {
        otherUserId: to
      }
    });

    const { socket } = this;

    socket.on('message', data => {
      this.setState({
        messages: this.state.messages.concat(data)
      });
    });

    // get all messages between the currentUser and the other user
    // if there is no message history no messages will be displayed
    fetch(`api/messages/${to}`, {
      method: 'GET',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(res => res.json())
      .then(messages => {
        this.setState({
          messages: messages,
          isLoading: false
        });
      });
  }

  componentWillUnmount() {
    // this will allow for a user to disconnect from the socket.io server
    // when they leave that chat
    this.socket.disconnect();
  }

  handleMessageChange(event) {
    // as a user types something in the input we want that to display
    // accordingly. An onChange prop will be needed on the input
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      newMsgContent: value
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    const msgObj = {
      recipientId: this.props.to,
      content: this.state.newMsgContent
    };
    fetch('api/messages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(msgObj)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          newMsgContent: ''
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // this is helping the chat box scroll to the bottom to view the
    // most recent message
    // the guard is there to update only when the messages array is
    // updated
    if (this.state.messages !== prevState.messages) {
      const scroll =
        this.chatContainer.current.scrollHeight -
        this.chatContainer.current.clientHeight;
      this.chatContainer.current.scrollTo(0, scroll);
    }
  }

  render() {
    if (this.state.isLoading === true) return null;
    const userId = this.props.userId;

    return (
      <>
        <Container className='chat-container'>
          <Row className="justify-content-center">
            <Card className='chat p-0 form-color chat-card' style={{ width: '50rem' }}>
              <Card.Header className='d-flex justify-content-between align-items-center'>
                <Card.Text className='text-light d-inline-block mb-0 chat-title'>Goalie Finder</Card.Text>
                <a href="#home">
                  <i className="x fas fa-times text-light"></i>
                </a>
              </Card.Header>
              <Card.Body className='p-0 chat-body' ref={this.chatContainer}>
                {
                  this.state.messages.map(message => {
                    if (message.senderId === userId) {
                      return <SenderMsg key={message.messageId} message={message} />;
                    } else {
                      return <RecipientMsg key={message.messageId} message={message} />;
                    }
                  })
                }
              </Card.Body>
              <Card.Footer>
                <form id="chat-form" onSubmit={this.handleSubmit}>

                  <div className="input-group">
                    <input required id='newMsgContent' value={this.state.newMsgContent} onChange={this.handleMessageChange} type="text" name='newMsgContent' className="dark-input form-control" placeholder="Enter Message.." />
                    <button className="btn btn-outline-secondary text-light" type="submit" id="send-msg">SEND</button>
                  </div>

                </form>
              </Card.Footer>
            </Card>
          </Row>
        </Container>
      </>
    );
  }

  /*
    We need to look at every message between the two people

    If the senderId matches the current userId
    then that messages content needs to go in SenderMsg

    if not then the message content will go through the recipientMsg
    function

    this way the messages are formatted correctly in our chat box
  */
}

function SenderMsg(props) {
  const { content, username } = props.message;

  return (
  // senderId message content
    <>
      <div className="d-flex justify-content-end">
        <div className="text-light ps-2 me-3 mt-3">
        {username}
        </div>
      </div>
      <div className="d-flex justify-content-end mb-4 me-3">
        <div className="ps-5">
          <div className="message card d-inline-block text-light border border-light p-2 text-end">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}

// recipientId message content
function RecipientMsg(props) {
  const { content, username } = props.message;

  return (
    <>
      <div className="d-flex justify-content-start">
        <div className="text-light ms-3">
          {username}
        </div>
      </div>
      <div className="d-flex mb-4 ms-3">
        <div className="pe-5">
          <div className="message card d-inline-block text-light border border-light p-2">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
