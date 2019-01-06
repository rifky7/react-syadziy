import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import API from '../../../helpers/API'

class DeleteKota extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formdata: {
                kode_kota: '',
                nama_kota: '',
                kode_provinsi: ''
            },
            isRequest: false
        }
        this.deleteHandler = this.deleteHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.kota
        })
    }
    async deleteHandler(){
        this.setState({
            isRequest: true
        })
        let result = await API.deletekota(this.state.formdata.kode_kota, this.state.formdata.nama_kota, this.state.formdata.kode_provinsi, this.state.formdata.is_delete)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Dihapus')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Kota </ModalHeader>
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
export default DeleteKota