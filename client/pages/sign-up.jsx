import React from 'react';
import { Container, Row, Card, Form, Button } from 'react-bootstrap';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      location: '',
      position: '',
      availability: '',
      file: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      file: '/images/placeholder-goalie.png'
    });
  }

  handleImgClick(event) {
    this.fileInputRef.current.click();
  }

  handleFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    event.preventDefault();

    const formData = new FormData();

    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('name', this.state.name);
    formData.append('position', this.state.position);
    formData.append('location', this.state.location);
    formData.append('availability', this.state.availability);
    formData.append('image', this.fileInputRef.current.files[0]);

    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          username: '',
          password: '',
          name: '',
          location: '',
          position: '',
          availability: '',
          file: ''
        });
        window.location.hash = '#';
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <h2 className='d-flex justify-content-center list-header mt-3'>Create Profile</h2>
          </Row>
          <Row className="d-flex justify-content-center">
            <Card className='mb-5 p-0 border-0 form-color' style={{ width: '50rem' }}>
              <Card.Img className="edit-pic mb-3 shadow" onClick={this.handleImgClick} src={this.state.file} />
              <Card.Body className='p-0'>
                <Form onSubmit={this.handleSubmit}>
                  <input
                    className='d-none'
                    ref={this.fileInputRef}
                    name='image'
                    type="file"
                    accept='.png, .jpg, .jpeg, .gif'
                    onChange={this.handleFileChange} />

                  <Form.Group className="mb-3 shadow-sm" controlId="name">
                    <Form.Control required name="name" value={this.state.name} onChange={this.handleChange} type="text" placeholder="Name.." />
                  </Form.Group>

                  <Form.Group className="mb-3 shadow-sm" controlId="position">
                    <Form.Select required name="position" value={this.state.position} onChange={this.handleChange}>
                      <option >Position Preference</option>
                      <option >Ice goalie</option>
                      <option >Roller goalie</option>
                      <option >Goalie for either</option>
                      <option >Ice player</option>
                      <option >Roller player</option>
                      <option >Player for either</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3 shadow-sm" controlId="location">
                    <Form.Control required name="location" value={this.state.location} type="text" placeholder="location" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3 shadow-sm" controlId="availability">
                    <Form.Select required name="availability" value={this.state.availability} onChange={this.handleChange}>
                      <option >What do you need?</option>
                      <option >Available to play goalie</option>
                      <option >Unavailable to play goalie</option>
                      <option >Looking for goalie</option>
                      <option >We have a goalie</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3 shadow-sm" controlId="username">
                    <Form.Control required name="username" type='text' value={this.state.username} placeholder="USERNAME.." onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3 shadow-sm" controlId="password">
                    <Form.Control required name="password" value={this.state.password} type="password" placeholder="PASSWORD.." onChange={this.handleChange} />
                  </Form.Group>

                  <div className='d-flex justify-content-end'>
                    <Button className="save-btn shadow-sm" variant="danger" type="submit">
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
