import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import API from '../../../helpers/API'

class CreateKota extends React.Component{
    constructor (props){
        super(props)
        this.state={
            provinsi:[],
            formdata:{
                kode_kota:'',
                nama_kota:'',
                kode_provinsi:''
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
        let result = await API.createkota(this.state.formdata.kode_kota, this.state.formdata.nama_kota, this.state.formdata.kode_provinsi)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Tersimpan')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    getListProvinsi() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.PROVINSI.LISTPROVINSI, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                provinsi: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.getListProvinsi()
    }
    render(){
        return(
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader>Add Kota</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text">Kode Kota :</label>
                        <input type="text" class="form-control" placeholder="Kode Kota"
                        name="kode_kota" onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text">Nama Kota :</label>
                        <input type="text" class="form-control" placeholder="Nama Kota"
                        name="nama_kota" onChange={this.changeHandler} required/>
                    </div>
                    <div class ="form-group">
                        <label>Provinsi</label>
                        <select name="kode_provinsi" class="form-control" onChange={this.changeHandler} required >
                            <option>Pilih Provinsi</option>
                            {this.state.provinsi.map((row)=>
                                <option value={row.kode_provinsi}>{row.nama_provinsi}</option>
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
export default CreateKota
