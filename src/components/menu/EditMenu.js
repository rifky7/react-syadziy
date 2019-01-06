import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../configs/api.config.json'
import API from '../../helpers/API'

class EditMenu extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            icons:[],
            formdata: {
                nama_menu: '',
                path_menu: '',
                icons_menu: ''
            },
            isRequest: false
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.menutest
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
        let result = await API.editmenu(this.state.formdata.id_menu, this.state.formdata.nama_menu, this.state.formdata.path_menu, this.state.formdata.icons_menu)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Diubah')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    getListIcons() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.ICON.LISTICON, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                icons: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.getListIcons()
    }
    render(){
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader>Edit Data Menu</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">ID Menu : </label>
                        <input type="text" class="form-control" readOnly
                        name="id_menu"
                        value={this.state.formdata.id_menu}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                    <label for="text">Nama Menu : </label>
                        <input type="text" class="form-control"
                        name="nama_menu"
                        value={this.state.formdata.nama_menu}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text">Path Menu : </label>
                        <input type="text" class="form-control"
                        name="path_menu"
                        value={this.state.formdata.path_menu}
                        onChange={this.changeHandler}/>
                    </div>
                    <div class ="form-group">
                            <label>Icons</label>
                            <select name="icons_menu" class="form-control" onChange={this.changeHandler} required >
                                <option value={this.state.formdata.nama_icons}>{this.state.formdata.icons_menu}</option>
                                {this.state.icons.map((row)=>
                                    <option value={row.nama_icons}>{row.nama_icons}</option>
                                    )
                                }
                            </select>
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
export default EditMenu
