import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewJurusan extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Jurusan</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">Kode Jurusan : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_jurusan"
                        value={this.props.jurusan.kode_jurusan}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Jurusan : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_jurusan"
                        value={this.props.jurusan.nama_jurusan}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Fakultas : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_fakultas"
                        value={this.props.jurusan.kode_fakultas}
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
export default ViewJurusan
