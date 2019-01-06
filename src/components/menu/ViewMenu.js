import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewUser extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Menu</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">ID Menu :</label>
                        <input type="text" class="form-control" readOnly
                        name="id_menu"
                        value={this.props.menu.id_menu}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text">Nama Menu :</label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_menu"
                        value={this.props.menu.nama_menu}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text">Path Menu :</label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="path_menu"
                        value={this.props.menu.path_menu}
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
