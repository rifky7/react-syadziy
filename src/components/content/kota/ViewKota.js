import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewKota extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Kota</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> Kode Kota : </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_kota"
                        value={this.props.kota.kode_kota}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Kota : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_kota"
                        value={this.props.kota.nama_kota}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Provinsi : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_provinsi"
                        value={this.props.kota.kode_provinsi}
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
export default ViewKota
