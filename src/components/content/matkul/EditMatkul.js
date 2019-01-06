import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import Selected from 'react-select'
import API from '../../../helpers/API'

class EditMatkul extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            jurusan:[],
            formdata:{
                kode_matkul:'',
                nama_matkul:'',
                kode_jurusan:'',
                semester:'',
                sks:''
            },
            isRequest: false
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.matkultest
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
        let result = await API.editmatkul(
            this.state.formdata.kode_matkul, 
            this.state.formdata.nama_matkul, 
            this.state.formdata.kode_jurusan,
            this.state.formdata.semester,
            this.state.formdata.sks
            )
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Diubah')
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
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader>Edit Data Mata Kuliah</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> Kode Mata Kuliah : </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_matkul"
                        value={this.state.formdata.kode_matkul}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama Mata Kuliah : </label>
                        <input type="text" class="form-control"
                        name="nama_matkul"
                        value={this.state.formdata.nama_matkul}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label>Jurusan :</label>
                        <select name="kode_jurusan" class="form-control" onChange={this.changeHandler} required >
                            <option value={this.state.formdata.kode_jurusan}>{this.state.formdata.nama_jurusan}</option>
                            {this.state.jurusan.map((row)=>
                                <option value={row.kode_jurusan}>{row.nama_jurusan}</option>
                                )
                            }
                        </select>
                    </div>
                    <div class ="form-group">
                        <label for="text"> Semester : </label>
                        <input type="text" class="form-control"
                        name="semester"
                        value={this.state.formdata.semester}
                        onChange={this.changeHandler}/>
                    </div>
                    <div class ="form-group">
                        <label for="text"> Jumlah SKS : </label>
                        <input type="text" class="form-control"
                        name="sks"
                        value={this.state.formdata.sks}
                        onChange={this.changeHandler} />
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditMatkul
