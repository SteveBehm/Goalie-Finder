import React from 'react';
import { Container, Row, Card, Form, Button } from 'react-bootstrap';

export default class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      file: '',
      name: '',
      location: '',
      position: '',
      availability: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this path will be changed later on when I have user accounts
    fetch(`api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(user => this.setState({
        isloading: false,
        file: user.profilePicUrl,
        name: user.name,
        location: user.location,
        position: user.position,
        availability: user.availability
      }));
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

  /*
    formData will be sent to the server as the body of the PUT method
    Thanks to the multer package the image will also be sent to the server
    the data we get back will then be used to set the state
    the fileInputRef.current.value will be set to null in case the user
    wants to switch the picture again
  */
  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('name', this.state.name);
    formData.append('position', this.state.position);
    formData.append('location', this.state.location);
    formData.append('availability', this.state.availability);
    formData.append('image', this.fileInputRef.current.files[0]);

    fetch('/api/me', {
      method: 'PUT',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          file: data.profilePicUrl,
          name: data.name,
          location: data.location,
          position: data.position,
          availability: data.availability
        });
        this.fileInputRef.current.value = null;
        window.location.hash = '#home';
      })
      .catch(err => console.error(err));
  }

  render() {
    // this is used to avoid rendering the screen before the users data
    // has been loaded
    if (this.state.isloading === true) return null;
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
                <Form onSubmit={this.handleSubmit}>
                  <input
                  className='d-none'
                  ref={this.fileInputRef}
                  name='image'
                  type="file"
                  accept='.png, .jpg, .jpeg, .gif'
                  onChange={this.handleFileChange} />

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
