import React, { useState } from 'react';
import Modal from 'react-modal';
import './EditUser.css';
import { color } from 'chart.js/helpers';

const customStyles = {
  overlay: {
    backgroundColor: 'rgb(0,0,0,.2)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: '#ADB991'
  },
};

function EditableUserForm({ userData, onSave, onCancel }) {
  const [editedUserData, setEditedUserData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUserData);
  };

  return (
    <form className = "form" onSubmit={handleSubmit}>
      <label>
        Duration:
        <input className='input'
          type="number"
          name="duration"
          value={editedUserData.duration}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <label>
        Date:
        <input className='input'
          type="date"
          name="date"
          value={editedUserData.date}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <br></br>
      <div className='buttons'>
      <button className = "savebutton" type="submit">Save</button>
      <button className = "cancelbutton" type="button" onClick={onCancel}>
        Cancel
      </button>
      </div>
    </form>
  );
}

function EditUserModal({ isOpen, onClose, userData, onSave }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Edit User Modal"
    >
      <h2>Edit Run</h2>
      <EditableUserForm userData={userData} onSave={onSave} onCancel={onClose} />
    </Modal>
  );
}

export default EditUserModal;
