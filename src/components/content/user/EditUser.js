import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import API from '../../../helpers/API'

class EditUser extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            formdata: {
                id_user: '',
                username: '',
                password: ''
            },
            isRequest: false
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.usertest
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
        let result = await API.edituser(this.state.formdata.id_user, this.state.formdata.username, this.state.formdata.password)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Diubah')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    render(){
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader>Edit Data User</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">ID User : </label>
                        <input type="text" class="form-control" readOnly
                        name="id_user"
                        value={this.state.formdata.id_user}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                    <label for="text">Username : </label>
                        <input type="text" class="form-control"
                        name="username"
                        value={this.state.formdata.username}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text">Password : </label>
                        <input type="text" class="form-control"
                        name="password"
                        value={this.state.formdata.password}
                        onChange={this.changeHandler}/>
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
export default EditUser
