import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import API from '../../../helpers/API'

class DeleteMahasiswa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formdata: {
                id_mahasiswa: '',
                nim_mahasiswa:'',
                nama_mahasiswa:'',
                alamat_mahasiswa:'',
                tanggalLahir_mahasiswa:'',
                kode_fakultas:'',
                kode_jurusan:'',
                kode_provinsi:'',
                kode_kota:''
            },
            isRequest: false
        }
        this.deleteHandler = this.deleteHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.mahasiswa
        })
    }
    async deleteHandler(){
        this.setState({
            isRequest: true
        })
        let result = await API.deletemahasiswa(this.state.formdata.id_mahasiswa, this.state.formdata.nim_mahasiswa, this.state.formdata.nama_mahasiswa, this.state.formdata.alamat_mahasiswa, this.state.formdata.tanggalLahir_mahasiswa, this.state.formdata.kode_fakultas, this.state.formdata.kode_jurusan, this.state.formdata.kode_provinsi, this.state.formdata.kode_kota, this.state.formdata.is_delete)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Dihapus')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Mahasiswa </ModalHeader>
                <ModalBody >
                    <p> Yakin mau menghapus kenangan? </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteMahasiswa