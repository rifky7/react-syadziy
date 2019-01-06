import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../configs/api.config.json'
import API from '../../helpers/API'

class CreateMenu extends React.Component{
    constructor (props){
        super(props)
        this.state={
            icons:[],
            formdata:{
                nama_menu:'',
                path_menu:'',
                icons_menu:''
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
        let result = await API.createmenu(this.state.formdata.nama_menu, this.state.formdata.path_menu, this.state.formdata.icons_menu)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Tersimpan')
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
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader>Add Menu</ModalHeader>
                <ModalBody >
                    <form class="form-group">
                        <div class ="form-group">
                            <label for="text">ID Menu :</label>
                            <input type="text" class="form-control" placeholder="" readOnly
                            name="id_menu" onChange={this.changeHandler} />
                        </div>
                        <div class ="form-group">
                        <label for="text">Nama Menu :</label>
                            <input type="text" class="form-control" placeholder="Nama Menu"
                            name="nama_menu" onChange={this.changeHandler} required/>
                        </div>
                        <div class ="form-group">
                            <label>Path Menu :</label>
                            <input type="text" class="form-control" placeholder="Path Menu"
                            name="path_menu" onChange={this.changeHandler} required />
                        </div>
                        <div class ="form-group">
                            <label>Icons</label>
                            <select name="icons_menu" class="form-control" onChange={this.changeHandler} required >
                                <option>Pilih Icons</option>
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
                    <Button color="warning" onClick ={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateMenu
