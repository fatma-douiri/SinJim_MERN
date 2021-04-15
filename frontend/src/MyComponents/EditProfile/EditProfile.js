import React,{useState} from 'react'
import {editUser} from '../../JS/actions/userActions'
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const EditProfile = ({user}) => {
    const [show, setShow] = useState(false);
    const [newUser,setNewUser]=useState(user)
    const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("EditProfile: user",user)

  const edit=()=>{
    dispatch(editUser(user._id, newUser));
    
  }
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  
    return (
        <div>
            <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <input
            type="text"
            aria-label="Recipient's username"
            name="userName"
            aria-describedby="button-addon2"
            value={newUser.userName}
            onChange={handleChange}
          />
           <input
            type="text"
            aria-label="Recipient's email"
            aria-describedby="button-addon2"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"onClick={handleClose} >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              newUser? edit(): alert("It is empty!")
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        </div>
    )
}

export default EditProfile
