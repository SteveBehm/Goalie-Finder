import React from 'react';
// import io from 'socket.io-client';
import { Container, Row, Card } from 'react-bootstrap';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: []
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // const socket = io.connect('/');

    // get all messages between the currentUser and the other user
    // if there is no message history no messages will be displayed
    fetch('api/conversations/3/2', {
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

  handleMessageChange(event) {
    // as a user types something in the input we want that to display
    // accordingly. An onChange prop will be needed on the input
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    // we need to take the message that is being sent and send it to our server
    // so that we can store it in our database as the last message
    // we also need the message to then be displayed in the chat box below the
    // previous message and in the correct alignment/styling

    // we then need to clear the currrent msgContent from the state
    // change the state of current message so that we can display current message
    // in our chat body(the value of that text content will be the current message)

    event.preventDefault();
    fetch('api/conversations', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {

      });
  }

  render() {
    if (this.state.isLoading === true) return null;
    const userId = this.props.userId;

    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Card className='chat p-0 form-color' style={{ width: '50rem' }}>
              <Card.Header className='d-flex justify-content-between align-items-center'>
                <Card.Text className='text-light d-inline-block mb-0'>Patrick Roy</Card.Text>
                <a href="#home">
                  <i className="fas fa-times text-light"></i>
                </a>
              </Card.Header>
              <Card.Body className='p-0 chat-body'>
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
                    <input onChange={this.handleMessageChange} type="text" className="dark-input form-control" placeholder="Enter Message.." aria-label="Recipient's username" aria-describedby="send-msg" />
                    <button className="btn btn-outline-secondary text-light" type="button" id="send-msg">SEND</button>
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
  */
}

function SenderMsg(props) {
  const { content } = props.message;

  return (
  // senderId message content
    <>
      <div className="d-flex justify-content-end">
        <div className="text-light ps-2 me-3 mt-3">
          GL
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
  const { content } = props.message;

  return (
    <>
      <div className="d-flex justify-content-start">
        <div className="text-light ms-3">
          PR
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
