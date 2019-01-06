import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import API from '../../../helpers/API'

class EditProvinsi extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            formdata: {
                kode_provinsi: '',
                nama_provinsi: ''
            },
            isRequest: false
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.provinsitest
        })
    }
    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    async submitHandler(){
        this.setState({
            isRequest: true
        })
        let result = await API.editprovinsi(this.state.formdata.kode_provinsi, this.state.formdata.nama_provinsi)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Diubah')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    render(){
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader>Edit Data Provinsi</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">Kode Provinsi : </label>
                        <input type="text" class="form-control"
                        name="kode_provinsi" readOnly
                        value={this.state.formdata.kode_provinsi}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                    <label for="text">Nama Provinsi : </label>
                        <input type="text" class="form-control"
                        name="nama_provinsi"
                        value={this.state.formdata.nama_provinsi}
                        onChange={this.changeHandler} />
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditProvinsi
