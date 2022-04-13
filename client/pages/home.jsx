import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // the state is set so that users is an empty array until we fetch the users data
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

  /*
    The first thing to get rendered is the list header
    We map through the users array that now has data in it
    each index in the array will be made into a column/card.
  */
  render() {
    return (
      <>
      <div className='container'>
          <h2 className='d-flex justify-content-center list-header mt-3'>All Users</h2>
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

/*
  The function below is used to create one card that will be placed into one column
  This function will get called in the render method to become a child of the Col react element
  It was necessary to use a ternary expression to determine the color of the availability data
  point for users.
*/

function User(props) {
  const { name, profilePicUrl, location, position, availability } = props.user;

  return (
  <Card className='mb-5' style={{ width: '25rem' }}>
  <Card.Img src={profilePicUrl} />
  <Card.Body>
        <div className='d-flex justify-content-between'>
          <Card.Title className='name mb-1'>{name}</Card.Title>
          <a href="#" className="chat pe-2"><i className="fa fa-paper-plane text-dark"></i></a>
    </div>
    <Card.Title className='position mb-1'>{position}</Card.Title>
    <Card.Title className='location'>{location}</Card.Title>
        <Card.Text className={availability === 'Available to play goalie' || availability === 'Looking for goalie'
          ? 'availability text-center success'
          : 'availability text-center danger'}>{availability}</Card.Text>
  </Card.Body>
  </Card>
  );
}
