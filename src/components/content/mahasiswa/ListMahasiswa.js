import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewMahasiswa from './ViewMahasiswa'
import CreateMahasiswa from './CreateMahasiswa'
import EditMahasiswa from './EditMahasiswa'
import DeleteMahasiswa from './DeleteMahasiswa'
import MUIDataTables from 'mui-datatables'

class ListMahasiswa extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateMahasiswa:false,
            mahasiswa:[],
            currentMahasiswa:{},
            alertData: {
                status: 0,
                message: ''
            }
        }
        this.showHandler=this.showHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        // this.changeHandler=this.changeHandler.bind(this)
        this.unitHandler=this.unitHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.deleteHandler=this.deleteHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }
    viewModalHandler(id_mahasiswa) {
        let tmp = {}
        this.state.mahasiswa.map((row) => {
            if (id_mahasiswa == row.id_mahasiswa) {
                tmp = ({id_mahasiswa:row.id_mahasiswa,
                    nim_mahasiswa:row.nim_mahasiswa,
                    nama_mahasiswa:row.nama_mahasiswa,
                    alamat_mahasiswa:row.alamat_mahasiswa,
                    tanggalLahir_mahasiswa:row.tanggalLahir_mahasiswa,
                    kode_fakultas:row.kode_fakultas.nama_fakultas,
                    kode_jurusan:row.kode_jurusan.nama_jurusan,
                    kode_provinsi:row.kode_provinsi.nama_provinsi,
                    kode_kota:row.kode_kota.nama_kota})
            }
        })
        this.setState({
            currentMahasiswa : tmp,
            viewMahasiswa : true
        })
    }
    deleteModalHandler(id_mahasiswa) {
        let tmp = {}
        this.state.mahasiswa.map((row) => {
            if (id_mahasiswa == row.id_mahasiswa) {
                tmp=({id_mahasiswa:row.id_mahasiswa,
                nim_mahasiswa:row.nim_mahasiswa,
                nama_mahasiswa:row.nama_mahasiswa,
                alamat_mahasiswa:row.alamat_mahasiswa,
                tanggalLahir_mahasiswa:row.tanggalLahir_mahasiswa,
                kode_fakultas:row.kode_fakultas,
                kode_jurusan:row.kode_jurusan,
                kode_provinsi:row.kode_provinsi,
                kode_kota:row.kode_kota,
                is_delete:true})
            }
        })
        this.setState({
            currentMahasiswa : tmp,
            deleteMahasiswa : true
        })
    }
    editModalHandler(id_mahasiswa) {
        let tmp = {}
        this.state.mahasiswa.map((row) => {
            if (id_mahasiswa == row.id_mahasiswa) {
                tmp = ({id_mahasiswa:row.id_mahasiswa,
                    nim_mahasiswa:row.nim_mahasiswa,
                    nama_mahasiswa:row.nama_mahasiswa,
                    alamat_mahasiswa:row.alamat_mahasiswa,
                    tanggalLahir_mahasiswa:row.tanggalLahir_mahasiswa,
                    kode_fakultas:row.kode_fakultas.nama_fakultas,
                    kode_jurusan:row.kode_jurusan.nama_jurusan,
                    kode_provinsi:row.kode_provinsi.nama_provinsi,
                    kode_kota:row.kode_kota.nama_kota})
            }
        })
        this.setState({
            currentMahasiswa : tmp,
            editMahasiswa : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewMahasiswa : false,
            editMahasiswa : false,
            deleteMahasiswa : false
        })
        this.getListMahasiswa()
    }
    showHandler(){
        this.setState({showCreateMahasiswa:true})
    }
    closeHandler(){
        this.setState({showCreateMahasiswa:false})
    }
    // changeHandler(e){
    //     let tmp=this.state.formdata
    //     tmp[e.target.name]=e.target.value
    //     this.setState({
    //         formdata:tmp
    //     })
    // }
    unitHandler(e){
        let tmp=this.state.formdata
        tmp.m_unit_id=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                alert('Success')
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    getListMahasiswa() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA.LISTMAHASISWA, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                mahasiswa: response.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    // componentWillMount(){
    //     //this.loadData();
    //     this.getListCompany()
    // }
    // componentDidMount(){
    //     var self = this;
 	// 	$('#mytable').dataTable({
	// 	  "sPaginationType": "bootstrap",
	// 	  "bAutoWidth": false,
	// 	  "bDestroy": true,
	// 	  "fnDrawCallback": function() {
    //         	self.forceUpdate();
    //       },
	// 	});
    // }
    // componentDidUpdate(){
    //     $('#mytable').dataTable({
    //      "sPaginationType": "bootstrap",
    //      "bAutoWidth": false,
    //      "bDestroy": true,
    //    });
    // }
    componentDidMount(){
        this.getListMahasiswa()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.company.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.company
            tmp.splice(currentindex,1)
            this.setState({
                company: tmp
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            showCreateMahasiswa : false,
            viewMahasiswa : false,
            editMahasiswa : false,
            deleteMahasiswa : false
        })
        this.getListMahasiswa()
    }
    render(){
        const columns = ["No", "NIM", "Nama Mahasiswa", "Fakultas", "Jurusan", "Provinsi", "Kota", "Action"];
        const data=[]

        this.state.mahasiswa.map(row =>
            
            {let tmp=[]
                tmp.push(row.id_mahasiswa,row.nim_mahasiswa,row.nama_mahasiswa,row.kode_fakultas.nama_fakultas,row.kode_jurusan.nama_jurusan,row.kode_provinsi.nama_provinsi,row.kode_kota.nama_kota,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.id_mahasiswa)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.id_mahasiswa)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.id_mahasiswa)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                </Link>
                )
                data.push(tmp)
            })

            const options = {
                filter: false,
                responsive: "scroll",
                print: false,
                download: false,
                selectableRows: false,
                viewColumns: false,
            };

        return (
            <div>
            <div class="container-fluid">
                <h4>List Mahasiswa</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateMahasiswa
                    create = {this.state.showCreateMahasiswa}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewMahasiswa
                    view = {this.state.viewMahasiswa}
                    closeModalHandler = {this.closeModalHandler}
                    mahasiswa = {this.state.currentMahasiswa}
                    />
                    <DeleteMahasiswa
                    delete = {this.state.deleteMahasiswa}
                    mahasiswa = {this.state.currentMahasiswa}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditMahasiswa
                    edit = {this.state.editMahasiswa}
                    closeModalHandler = {this.closeModalHandler}
                    mahasiswatest = {this.state.currentMahasiswa}
                    modalStatus = {this.modalStatus}
                    />
                    <br/><br/>
                    <MUIDataTables
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}
export default ListMahasiswa
