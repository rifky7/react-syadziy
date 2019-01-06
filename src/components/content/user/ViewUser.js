import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewUser extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data User</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> ID User : </label>
                        <input type="text" class="form-control" readOnly
                        name="id_user"
                        value={this.props.user.id_user}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Username : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="username"
                        value={this.props.user.username}
                        onChange={this.changeHandler} />
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewUser
