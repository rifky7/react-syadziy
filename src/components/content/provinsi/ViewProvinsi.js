import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewProvinsi extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Provinsi</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> Kode Provinsi : </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_provinsi"
                        value={this.props.provinsi.kode_provinsi}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Provinsi : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_provinsi"
                        value={this.props.provinsi.nama_provinsi}
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
export default ViewProvinsi
