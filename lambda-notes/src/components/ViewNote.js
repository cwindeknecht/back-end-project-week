import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';

import CheckList from './CheckList';

import { edit_note_clicked, load_notes, view_button_click } from '../actions/index';

import './css/ViewNote.css';

const ROUTE = 'https://pure-sands-16313.herokuapp.com/notes/';

class ViewNote extends React.Component {
  state = {
    modalIsOpen: false,
  };
  render() {
    return (
      <div className="view">
        {!this.props.remove ? (
          <div>
            <div className="edit" onClick={this.handleEdit}>
              edit
            </div>
            <div>
              <div className="delete" onClick={this.openModal}>
                delete
              </div>
              <Modal isOpen={this.state.modalIsOpen} style={customStyles} ariaHideApp={false}>
                <div>
                  Are you sure you want to delete this? <br />
                  <button className="modal-delete" onClick={this.handleDelete}>
                    Delete
                  </button>
                  <button className="modal-no" onClick={this.closeModal}>
                    No
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        ) : null}
        <h1 className="view-header"> {this.props.note.title} </h1>
        <p className="view-body"> {this.props.note.body} </p>
        {!this.props.remove ? (
          <div className="checklist">
            <CheckList key={this.props.note.id} note={this.props.note} />
          </div>
        ) : null}
      </div>
    );
  }
  handleEdit = () => {
    this.props.edit_note_clicked(this.props.note);
  };
  handleDelete = () => {
    axios
      .delete(`${ROUTE}${this.props.currentUser}/${this.props.note._id}`)
      .then((data) => {
        axios
          .get(`${ROUTE}${this.props.currentUser}`)
          .then((data) => {
            this.props.load_notes(data.data.foundNotes);
          })
          .then(() => {
            this.props.view_button_click();
          });
      })
      .catch((error) => {
        alert('Error Deleting Note', error);
      });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  handleCheckList = () => {
    let current = [].concat(this.state.count);
    current.push(1);
    this.setState({ show: true, count: current });
  };
}

//Tried doing this as css/className, but that didn't work.
const customStyles = {
  content: {
    top: '29.5%',
    left: '50%',
    right: '60%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px',
    textAlign: 'center',
  },
};

const mapStateToProps = (state) => {
  return {
    current: state.current,
    note: state.note,
    remove: state.remove,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, { edit_note_clicked, load_notes, view_button_click })(ViewNote);
