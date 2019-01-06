import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewFakultas extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Fakultas</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">Kode Fakultas : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_fakultas"
                        value={this.props.fakultas.kode_fakultas}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Fakultas : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_fakultas"
                        value={this.props.fakultas.nama_fakultas}
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
export default ViewFakultas
