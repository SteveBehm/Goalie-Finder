import React from 'react';
import { Container, Row, Card, Form, Button } from 'react-bootstrap';

export default class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      file: null,
      name: null,
      location: null,
      position: null,
      availability: null
    };
    this.handleChange.bind(this);
    this.handleImgClick.bind(this);
  }

  componentDidMount() {
    // this path will be changed later on when I have user accounts
    fetch('api/users/3')
      .then(res => res.json())
      .then(user => this.setState({
        user,
        file: user.profilePicUrl,
        name: user.name,
        location: user.location,
        position: user.position,
        availability: user.availability
      }));
  }

  handleImgClick() {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // <div className='no-display'>
  // <input type="file" onChange={this.handleChange} />
  // <img src={this.state.file} />
  // </div>

  render() {
    if (!this.state.user) return null;
    return (
     <>
        <Container>
          <Row>
            <h2 className='d-flex justify-content-center list-header mt-3'>Edit Profile</h2>
          </Row>
          <Row className="d-flex justify-content-center">
            <Card className='mb-5 p-0 border-0 form-color' style={{ width: '50rem' }}>
              <Card.Img className="edit-pic mb-3" onClick={this.handleImgClick} src={this.state.file} />
              <Card.Body className='p-0'>
                <Form>

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control name="name" value={this.state.name} onChange={this.handleChange} type="text" placeholder="Name.." />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="position">
                    <Form.Select name="position" value={this.state.position} onChange={this.handleChange}>
                      <option >Position Preference</option>
                      <option >Ice goalie</option>
                      <option >Roller goalie</option>
                      <option >Goalie for either</option>
                      <option >Ice player</option>
                      <option >Roller player</option>
                      <option >Player for either</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="location">
                    <Form.Control name="location" value={this.state.location} type="text" placeholder="location" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="availability">
                    <Form.Select name="availability" value={this.state.availability} onChange={this.handleChange}>
                      <option >What do you need?</option>
                      <option >Available to play goalie</option>
                      <option >Unavailable to play goalie</option>
                      <option >Looking for goalie</option>
                      <option >We have a goalie</option>
                    </Form.Select>

                  </Form.Group>
                  <div className='d-flex justify-content-end'>
                    <Button className="save-btn" variant="danger" type="submit">
                      SAVE
                    </Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
     </>
    );
  }
}
