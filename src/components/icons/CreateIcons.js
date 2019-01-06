import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import API from '../../helpers/API'

class CreateIcons extends React.Component{
    constructor (props){
        super(props)
        this.state={
            formdata:{
                nama_icons:''
            },
            isRequest: false
        }
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
    }
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    async submitHandler(){
        this.setState({
            isRequest: true
        })
        let result = await API.createicons(this.state.formdata.nama_icons)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Tersimpan')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    render(){
        return(
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader>Add Icons</ModalHeader>
                <ModalBody >
                    <form class="form-group">
                        <div class ="form-group">
                        <label for="text">Nama Icons :</label>
                            <input type="text" class="form-control" placeholder="Nama Icons"
                            name="nama_icons" onChange={this.changeHandler} required/>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick ={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateIcons
