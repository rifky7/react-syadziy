import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'
import Selected from 'react-select'
import API from '../../../helpers/API'

class EditMahasiswa extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fakultas:[],
            jurusan:[],
            provinsi:[],
            kota:[],
            formdata:{
                id_mahasiswa:'',
                nim_mahasiswa:'',
                nama_mahasiswa:'',
                alamat_mahasiswa:'',
                tanggalLahir_mahasiswa:'',
                kode_jurusan:'',
                kode_provinsi:'',
                kode_kota:''
            },
            selectedOptionFakultas:{},
            selectedOptionJurusan:{},
            selectedOptionProvinsi:{},
            selectedOptionKota:{},
            isRequest: false
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    handleChangeFakultas = (selectedOption) => {
        this.setState({selectedOptionFakultas: selectedOption})
    }
    handleChangeJurusan = (selectedOption) => {
        this.setState({selectedOptionJurusan: selectedOption})
    }
    handleChangeProvinsi = (selectedOption) => {
        this.setState({selectedOptionProvinsi: selectedOption})
    }
    handleChangeKota = (selectedOption) => {
        this.setState({selectedOptionKota: selectedOption})
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.mahasiswatest
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
        let result = await API.editmahasiswa(
            this.state.formdata.id_mahasiswa,
            this.state.formdata.nim_mahasiswa, 
            this.state.formdata.nama_mahasiswa, 
            this.state.formdata.alamat_mahasiswa,
            this.state.formdata.tanggalLahir_mahasiswa,
            this.state.selectedOptionFakultas.value,
            this.state.selectedOptionJurusan.value,
            this.state.selectedOptionProvinsi.value,
            this.state.selectedOptionKota.value
            )
        if(result.status === 200) {
            this.props.modalStatus(1, 'Data Berhasil Diubah')
        } else {
            this.props.modalStatus(2, 'Failed')
        }
    }
    componentDidMount(){
        this.getListFakultas()
        this.getListJurusan()
        this.getListProvinsi()
        this.getListKota()
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
    getListKota() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.KOTA.LISTKOTA, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                kota: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    render(){
        const optionFakultas=this.state.fakultas.map((fak)=>
            ({value: fak.kode_fakultas, label: fak.nama_fakultas})
        )

        const optionJurusan=this.state.jurusan.map((jur)=>
            ({value: jur.kode_jurusan, label: jur.nama_jurusan, link: jur.kode_fakultas.kode_fakultas})
        )

        const optionProvinsi=this.state.provinsi.map((prov)=>
            ({value: prov.kode_provinsi, label: prov.nama_provinsi})
        )

        const optionKota=this.state.kota.map((kota)=>
            ({value: kota.kode_kota, label: kota.nama_kota, link: kota.kode_provinsi.kode_provinsi})
        )

        const filteredOptionsJurusan = optionJurusan.filter((o) => o.link === this.state.selectedOptionFakultas.value)

        const filteredOptionsKota = optionKota.filter((o) => o.link === this.state.selectedOptionProvinsi.value)

        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader>Edit Data Mahasiswa</ModalHeader>
                <ModalBody >
                <form class="form-group">
                    <div class ="form-group">
                        <label for="text"> ID Mahasiswa : </label>
                        <input type="text" class="form-control" readOnly
                        name="id_mahasiswa"
                        value={this.state.formdata.id_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> NIM : </label>
                        <input type="text" class="form-control"
                        name="nim_mahasiswa"
                        value={this.state.formdata.nim_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama : </label>
                        <input type="text" class="form-control"
                        name="nama_mahasiswa"
                        value={this.state.formdata.nama_mahasiswa}
                        onChange={this.changeHandler}/>
                    </div>
                    <div class ="form-group">
                        <label for="text"> Tanggal Lahir : </label>
                        <input type="date" class="form-control"
                        name="tanggalLahir_mahasiswa"
                        value={this.state.formdata.tanggalLahir_mahasiswa}
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="form-group">
                        <label>Fakultas</label>
                        <Selected
                            name="kode_fakultas"
                            label={this.state.selectedOptionFakultas.value}
                            defaultValue={this.state.formdata.tanggalLahir_mahasiswa}
                            onChange={this.handleChangeFakultas}
                            options={optionFakultas}
                        />
                    </div>
                    <div class ="form-group">
                        <label>Jurusan</label>
                        <Selected
                            name="kode_jurusan"
                            label={this.state.selectedOptionJurusan.value}
                            onChange={this.handleChangeJurusan}
                            options={filteredOptionsJurusan}
                        />
                    </div>
                    <div class ="form-group">
                        <label>Provinsi</label>
                        <Selected
                            name="kode_provinsi"
                            label={this.state.selectedOptionProvinsi.value}
                            onChange={this.handleChangeProvinsi}
                            options={optionProvinsi}
                        />
                    </div>
                    <div class ="form-group">
                        <label>Kota</label>
                        <Selected
                            name="kode_kota"
                            label={this.state.selectedOptionKota.value}
                            onChange={this.handleChangeKota}
                            options={filteredOptionsKota}
                        />
                    </div>
                    <div class ="form-group">
                        <label>Alamat Lengkap</label>
                        <textarea rows="5" class="form-control" name="alamat_mahasiswa" onChange={this.changeHandler}>{this.state.formdata.alamat_mahasiswa}</textarea>
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
export default EditMahasiswa
