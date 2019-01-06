import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewMahasiswa extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Data Mahasiswa</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> ID Mahasiswa : </label>
                        <input type="text" class="form-control" readOnly
                        name="id_mahasiswa"
                        value={this.props.mahasiswa.id_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> NIM : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nim_mahasiswa"
                        value={this.props.mahasiswa.nim_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Lengkap : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_mahasiswa"
                        value={this.props.mahasiswa.nama_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Tanggal Lahir : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="tanggalLahir_mahasiswa"
                        value={this.props.mahasiswa.tanggalLahir_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Fakultas : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_fakultas"
                        value={this.props.mahasiswa.kode_fakultas}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Jurusan : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_jurusan"
                        value={this.props.mahasiswa.kode_jurusan}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Provinsi : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_provinsi"
                        value={this.props.mahasiswa.kode_provinsi}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Kota : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="kode_kota"
                        value={this.props.mahasiswa.kode_kota}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label>Alamat Lengkap</label>
                        <textarea rows="5" class="form-control" name="alamat_mahasiswa" readOnly onChange={this.changeHandler}>{this.props.mahasiswa.alamat_mahasiswa}</textarea>
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
export default ViewMahasiswa
