import React from 'react';
import { Container, Row, Card, Form, Button } from 'react-bootstrap';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      inavlidLogin: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: 'guylafleur1',
      password: 'jhwgugwfkfkb'
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inavlidLogin: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('/api/users/sign-in', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.handleSignIn(result);
        } else {
          this.setState({
            inavlidLogin: true
          });
        }
      });
  }

  render() {
    return (
      <Container className="container-center justify-content-center d-flex align-items-center">
          <Row className="absolute d-flex justify-content-center">
            <h2 className='d-flex justify-content-center login-logo mt-3'>Goalie Finder</h2>
            <i id="hockey-puck" className="d-flex justify-content-center fa-solid fa-hockey-puck"></i>
            <Card className='mb-5 p-0 border-0 form-color' style={{ width: '25rem' }}>
            <Card.Text className={this.state.inavlidLogin ? 'text-center text-warning' : 'd-none'}>
              Invalid username and/or password
            </Card.Text>
              <Card.Body className='p-0'>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3 d-flex justify-content-center" controlId="username-sign-in">
                    <Form.Control required className='shadow-sm' name="username" type="text" placeholder="USERNAME.." value={this.state.username} onChange={this.handleChange}/>
                  </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-center" controlId="password-sign-in">
                  <Form.Control required className='shadow-sm' name="password" type="password" placeholder="PASSWORD.." value={this.state.password} onChange={this.handleChange} />
                  </Form.Group>

                  <div className='d-flex justify-content-center'>
                    <Button className="login-btn border-0 save-btn shadow-sm" type="submit">
                      LOGIN
                    </Button>
                  </div>

                </Form>
                <div className='sign-up-div d-flex justify-content-end pt-2 me-4 fs-5'>
                  <a href='#sign-up' role='button' className='text-decoration-none'>Sign Up</a>
                </div>
              </Card.Body>
            </Card>
          </Row>
      </Container>
    );
  }
}
