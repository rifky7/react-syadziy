import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import API from '../../../helpers/API'

class CreateJurusan extends React.Component{
    constructor (props){
        super(props)
        this.state={
            fakultas:[],
            formdata:{
                kode_jurusan:'',
                nama_jurusan:'',
                kode_fakultas:''
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
        let result = await API.createjurusan(this.state.formdata.kode_jurusan, this.state.formdata.nama_jurusan, this.state.formdata.kode_fakultas)
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Tersimpan')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    getListFakultas() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.FAKULTAS.LISTFAKULTAS, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                fakultas: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.getListFakultas()
    }
    render(){
        return(
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader>Add Jurusan</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                    <label for="text">Kode Jurusan :</label>
                        <input type="text" class="form-control" placeholder="Kode Jurusan"
                        name="kode_jurusan" onChange={this.changeHandler} required/>
                    </div>
                    <div class ="form-group">
                        <label>Nama Jurusan :</label>
                        <input type="text" class="form-control" placeholder="Nama Jurusan"
                        name="nama_jurusan" onChange={this.changeHandler} required />
                    </div>
                    <div class ="form-group">
                        <label>Fakultas</label>
                        <select name="kode_fakultas" class="form-control" onChange={this.changeHandler} required >
                            <option>Pilih Fakultas</option>
                            {this.state.fakultas.map((row)=>
                                <option value={row.kode_fakultas}>{row.nama_fakultas}</option>
                                )
                            }
                        </select>
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick ={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateJurusan
