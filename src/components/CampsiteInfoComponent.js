import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'
import React, { Component } from 'react'
import { CAMPSITES } from '../shared/campsites'
class CampsiteInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  renderCampsite(campsites) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsites.image} alt={campsites.name} />
          <CardBody>
            <CardTitle>{this.props.campsite.name}</CardTitle>
            <CardText>{this.props.campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
  renderComments(comments) {
    if (comments) {
      return (
        <div className="col col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>
                  {' '}
                  {comment.text} <br></br> -- {comment.author}, {comment.date}
                </p>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <div>Not Working</div>
    }
  }
  render() {
    if (this.props.campsite) {
      return (
        <div className="container">
          <div className="row">
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.campsite.comments)}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default CampsiteInfo
