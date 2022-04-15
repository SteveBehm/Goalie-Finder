import React from 'react';
import { Container, Row, Card, Form, Button } from 'react-bootstrap';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/users/sign-in', {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        // handleSignIn(result);
      });
  }

  render() {
    return (
      <Container className="container-center justify-content-center d-flex align-items-center">
          <Row className="absolute d-flex justify-content-center">
            <h2 className='d-flex justify-content-center login-logo mt-3'>Goalie Finder</h2>
            <i id="hockey-puck" className="d-flex justify-content-center fa-solid fa-hockey-puck"></i>
            <Card className='mb-5 p-0 border-0 form-color' style={{ width: '25rem' }}>
              <Card.Body className='p-0'>
                <Form onSubmit={this.handleSubmit}>

                  <Form.Group className="mb-3" controlId="username">
                    <Form.Control name="username" type="text" placeholder="USERNAME.." onChange={this.handleChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                  <Form.Control name="password" type="password" placeholder="PASSWORD.." onChange={this.handleChange} />
                  </Form.Group>

                  <div className='d-flex justify-content-center'>
                    <Button className="save-btn" variant="light" type="submit" style={{ width: '25rem' }}>
                      LOGIN
                    </Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Row>
      </Container>
    );
  }
}
