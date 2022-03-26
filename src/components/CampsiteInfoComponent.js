import React, { Component } from 'react'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Modal,
  FormGroup,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const required = (val) => val && val.length
const maxLength = (len) => (val) => !val || val.length <= len
const minLength = (len) => (val) => val && val.length >= len

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)',
        }}
      >
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  )
}

function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in key={comment.id}>
                <div>
                  <p>
                    {comment.text}
                    <br />
                    -- {comment.author},{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </div>
              </Fade>
            )
          })}
        </Stagger>
        )
        <div>
          <CommentForm campsiteId={campsiteId} postComment={postComment} />
        </div>
      </div>
    )
  } else {
    return <div>Not Working</div>
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }
  handleSubmit(values) {
    this.toggleModal()
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text,
    )
  }

  validate(author, text) {
    const errors = {
      author: '',
    }

    if (this.state.touched.author) {
      if (author.length < 2) {
        errors.author = 'Name must be at least 2 characters.'
      } else if (author.length > 15) {
        errors.author = 'Name must be 15 characters or less.'
      }
    }

    return errors
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg"></i> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggle} charCode="close">
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Control.Select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Control.Text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be at least 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text">Comment</Label>
                <Control.Textarea
                  rows={6}
                  model=".text"
                  name="text"
                  id="text"
                  className="form-control"
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={console.log('Comment Submitted')}
              >
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    )
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
          <div className="row"></div>
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.campsite.comments}
            addComment={props.addComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default CampsiteInfo
