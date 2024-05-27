/* eslint-disable react/jsx-handler-names */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Modal, Button, Table, Alert } from 'react-bootstrap';

class SelectProposal extends React.Component {
  constructor(props) {
    super(props);
    this.onClickRow = this.onClickRow.bind(this);
    this.sendProposal = this.sendProposal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      pId: 0,
      pNumber: null,
    };
  }

  onClickRow(prop) {
    this.setState({ pId: prop.proposalId });
    this.setState({ pNumber: prop.code + prop.number });
  }

  sendProposal() {
    this.props.sendSelectProposal(this.state.pNumber);
  }

  handleCancel() {
    this.props.handleHide();
  }

  render() {
    const current_date = (new Date()).toUTCString();
    const sortedlist = this.props.data.proposalList.sort((a, b) =>
      a.number < b.number ? 1 : -1,
    );
    const proposals = sortedlist.map((prop) => (
      <tr
        key={prop.proposalId}
        style={
          this.state.pId === prop.proposalId
            ? { backgroundColor: '#d3d3d3' }
            : null
        }
        onClick={() => this.onClickRow(prop)}
      >
        <td>{prop.code + prop.number}</td>
        <td>{prop.title}</td>
        <td>{prop.person}</td>
      </tr>
    ));

    return (
      <Modal
        show={this.props.show}
        backdrop="static"
        onHide={this.handleCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: 'auto', height: '550px' }}>
            {this.props.data.proposalList.length > 0 ? (
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Proposal Number</th>
                    <th>Title</th>
                    <th>Person</th>
                  </tr>
                </thead>
                <tbody>{proposals}</tbody>
              </Table>
            ) : ( <Alert bg='light'>
                    You have no experiments scheduled for today ({current_date})
                  </Alert>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="float-end"
            disabled={this.state.pNumber === null}
            onClick={this.sendProposal}
          >
            Select Proposal
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const SelectProposalForm = reduxForm({
  form: 'proposals',
})(SelectProposal);

export default connect((state) => ({
  initialValues: { ...state.login.data },
}))(SelectProposalForm);
