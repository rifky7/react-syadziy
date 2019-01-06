import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import { Select } from '@material-ui/core'
import Selected from 'react-select'
import API from '../../../helpers/API'

class CreateMatkul extends React.Component{
    constructor (props){
        super(props)
        this.state={
            jurusan:[],
            formdata:{
                kode_matkul:'',
                nama_matkul:'',
                kode_jurusan:'',
                semester:'',
                sks:''
            },
            value:'',
            selectedOptionJurusan:{},
            isRequest: false
        }
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.handleChangeJurusan=this.handleChangeJurusan.bind(this)
    } 
    handleChangeJurusan(value){
        this.setState(value)
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
        let result = await API.creatematkul(
            this.state.formdata.kode_matkul, 
            this.state.formdata.nama_matkul,
            this.state.formdata.semester,
            this.state.formdata.sks
            )
        let resultdetail = await API.creatematkuldetail(
            this.state.formdata.kode_matkul, 
            this.state.selectedOptionJurusan.value
        )
        if(resultdetail.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Tersimpan')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    componentDidMount(){
        this.getListJurusan()
    }
    getListJurusan() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN.LISTJURUSAN, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                jurusan: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        const optionJurusan=this.state.jurusan.map((jur)=>
            ({value: jur.kode_jurusan, label: jur.nama_jurusan})
        )
        return(
            <Modal isOpen={this.props.create} className={this.props.className}>
                <ModalHeader>Add Mata Kuliah</ModalHeader>
                <ModalBody >
                <form class="form-group">
                     <div class ="form-group">
                        <label for="text">Kode Mata Kuliah :</label>
                        <input type="text" class="form-control" placeholder="Kode Jurusan" 
                        name="kode_matkul" onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                    <label for="text">Nama Mata Kuliah :</label>
                        <input type="text" class="form-control" placeholder="Mata Kuliah"
                        name="nama_matkul" onChange={this.changeHandler} required/>
                    </div>
                    <div class ="form-group">
                        <label>Semseter :</label>
                        <input type="text" class="form-control" placeholder="Semester"
                        name="semester" onChange={this.changeHandler} required />
                    </div>
                    <div class ="form-group">
                        <label>Jumlah SKS :</label>
                        <input type="text" class="form-control" placeholder="Jumlah SKS"
                        name="sks" onChange={this.changeHandler} required />
                    </div>
                    <div class ="form-group">
                        <label>Jurusan</label>
                        <Selected
                            name="kode_jurusan"
                            placeholder="Pilih Jurusan"
                            label={this.state.selectedOptionJurusan.value}
                            onChange={this.changeHandler}
                            options={optionJurusan}
                        />
                    </div>
                    {/* <div class ="form-group">
                        <label>Jurusan :</label>
                        <table className="table">
                        {this.state.jurusan.map((row)=>
                            <tr>
                                <td>{row.nama_jurusan}</td>
                                <td><input type="checkbox" class="form-control" value={row.kode_jurusan}
                                name="kode_jurusan" onChange={this.changeHandler}/></td>
                            </tr>
                            )
                        }
                        </table>
                    </div> */}
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
export default CreateMatkul
