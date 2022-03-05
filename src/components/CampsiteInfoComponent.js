import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'
import React, { Component } from 'react'
class CampsiteInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCampsite: null,
    }
  }
  renderCampsite(campsite) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
  render() {
    if (this.props.campsite) {
      return <div className="row">{this.props.campsite}</div>
    } else {
      return <div></div>
    }
  }
}

export default CampsiteInfo
