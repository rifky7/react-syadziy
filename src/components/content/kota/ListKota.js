import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewKota from './ViewKota'
import CreateKota from './CreateKota'
import EditKota from './EditKota'
import DeleteKota from './DeleteKota'
import MUIDataTables from "mui-datatables"

class ListKota extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateKota:false,
            kota:[],
            currentKota:{},
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
    viewModalHandler(kode_kota) {
        let tmp = {}
        this.state.kota.map((row) => {
            if (kode_kota == row.kode_kota) {
                tmp = ({kode_kota:row.kode_kota,nama_kota:row.nama_kota,kode_provinsi:row.kode_provinsi.nama_provinsi})
            }
        })
        this.setState({
            currentKota : tmp,
            viewKota : true
        })
    }
    deleteModalHandler(kode_kota) {
        let tmp = {}
        this.state.kota.map((row) => {
            if (kode_kota == row.kode_kota) {
                tmp=({kode_kota:row.kode_kota,nama_kota:row.nama_kota,kode_provinsi:row.kode_provinsi,is_delete:true})
            }
        })
        this.setState({
            currentKota : tmp,
            deleteKota : true
        })
    }
    editModalHandler(kode_kota) {
        let tmp = {}
        this.state.kota.map((row) => {
            if (kode_kota == row.kode_kota) {
                tmp = ({kode_kota:row.kode_kota,nama_kota:row.nama_kota,kode_provinsi:row.kode_provinsi.kode_provinsi,nama_provinsi:row.kode_provinsi.nama_provinsi})
            }
        })
        this.setState({
            currentKota : tmp,
            editKota : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewKota : false,
            editKota : false,
            deleteKota : false
        })
        this.getListKota()
    }
    showHandler(){
        this.setState({showCreateKota:true})
    }
    closeHandler(){
        this.setState({showCreateKota:false})
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
        this.getListKota()
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
            showCreateKota: false,
            viewKota : false,
            editKota : false,
            deleteKota : false
        })
        this.getListKota()
    }
    render(){
        const columns = ["Kode Kota", "Nama Kota", "Provinsi", "Action"];
        const data=[]

        this.state.kota.map(row =>
            
            {let tmp=[]
                tmp.push(row.kode_kota,row.nama_kota,row.kode_provinsi.nama_provinsi,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.kode_kota)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.kode_kota)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.kode_kota)}} class="fa fa-trash" style={{fontSize : '18px'}} />    
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
                <h4>List Kota</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateKota
                    create = {this.state.showCreateKota}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewKota
                    view = {this.state.viewKota}
                    closeModalHandler = {this.closeModalHandler}
                    kota = {this.state.currentKota}
                    />
                    <DeleteKota
                    delete = {this.state.deleteKota}
                    kota = {this.state.currentKota}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditKota
                    edit = {this.state.editKota}
                    closeModalHandler = {this.closeModalHandler}
                    kotatest = {this.state.currentKota}
                    modalStatus = {this.modalStatus}
                    />
                    <br/> <br/>
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
export default ListKota
