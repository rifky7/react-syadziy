import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewMatkul extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Mata Kuliah</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> Kode Mata Kuliah : </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_matkul"
                        value={this.props.matkul.kode_matkul}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Mata Kuliah : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_matkul"
                        value={this.props.matkul.nama_matkul}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Jurusan : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_jurusan"
                        value={this.props.matkul.kode_jurusan}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Semester : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="semester"
                        value={this.props.matkul.semester}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Jumlah SKS : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="sks"
                        value={this.props.matkul.sks}
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
export default ViewMatkul
