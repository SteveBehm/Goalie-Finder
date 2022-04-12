import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  // get all users and set the state property of users to an array of users
  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({
        users
      }));
  }

  render() {
    return (
      <>
      <div className='container'>
          <h2 className='d-flex justify-content-center list-header'>All Users</h2>
        </div>
      <Container>
        <Row>
          {
              this.state.users.map(user => (
                <Col className="d-flex justify-content-center" key={user.userId}>
                  <User user={user} />
                </Col>
              ))
            }
        </Row>
      </Container>
      </>
    );
  }
}

function User(props) {
  const { username, profilePicUrl, location, position, availability } = props.user;

  return (
  <Card className='my-3' style={{ width: '25rem' }}>
  <Card.Img src={profilePicUrl} />
  <Card.Body>
    <Card.Title className='username mb-1'>{username}</Card.Title>
    <Card.Title className='position mb-1'>{position}</Card.Title>
    <Card.Title className='location'>{location}</Card.Title>
        <Card.Text className={availability === 'Available to play goalie' || availability === 'Looking for goalie'
          ? 'availability text-center success'
          : 'availability text-center danger'}>{availability}</Card.Text>
  </Card.Body>
  </Card>
  );
}
