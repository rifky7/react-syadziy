import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewProvinsi from './ViewProvinsi'
import CreateProvinsi from './CreateProvinsi'
import EditProvinsi from './EditProvinsi'
import DeleteProvinsi from './DeleteProvinsi'
import MUIDataTables from 'mui-datatables'

class ListProvinsi extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateProvinsi:false,
            provinsi:[],
            currentProvinsi:{},
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
    viewModalHandler(kode_provinsi) {
        let tmp = {}
        this.state.provinsi.map((row) => {
            if (kode_provinsi == row.kode_provinsi) {
                tmp = row
            }
        })
        this.setState({
            currentProvinsi : tmp,
            viewProvinsi : true
        })
    }
    deleteModalHandler(kode_provinsi) {
        let tmp = {}
        this.state.provinsi.map((row) => {
            if (kode_provinsi == row.kode_provinsi) {
                tmp=({kode_provinsi:row.kode_provinsi,nama_provinsi:row.nama_provinsi,is_delete:true})
            }
        })
        this.setState({
            currentProvinsi : tmp,
            deleteProvinsi : true
        })
    }
    editModalHandler(kode_provinsi) {
        let tmp = {}
        this.state.provinsi.map((row) => {
            if (kode_provinsi == row.kode_provinsi) {
                tmp =row
            }
        })
        this.setState({
            currentProvinsi : tmp,
            editProvinsi : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewProvinsi : false,
            editProvinsi : false,
            deleteProvinsi : false
        })
        this.getListProvinsi()
    }
    showHandler(){
        this.setState({showCreateProvinsi:true})
    }
    closeHandler(){
        this.setState({showCreateProvinsi:false})
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
        this.getListProvinsi()
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
            showCreateProvinsi : false,
            viewProvinsi : false,
            editProvinsi : false,
            deleteProvinsi : false
        })
        this.getListProvinsi()
    }
    render(){
        const columns = ["Kode Provinsi", "Nama Provinsi", "Action"];
        const data=[]

        this.state.provinsi.map(row =>
            
            {let tmp=[]
                tmp.push(row.kode_provinsi,row.nama_provinsi,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.kode_provinsi)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.kode_provinsi)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.kode_provinsi)}} class="fa fa-trash" style={{fontSize : '18px'}} />
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
                <h4>List Provinsi</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateProvinsi
                    create = {this.state.showCreateProvinsi}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewProvinsi
                    view = {this.state.viewProvinsi}
                    closeModalHandler = {this.closeModalHandler}
                    provinsi = {this.state.currentProvinsi}
                    />
                    <DeleteProvinsi
                    delete = {this.state.deleteProvinsi}
                    provinsi = {this.state.currentProvinsi}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditProvinsi
                    edit = {this.state.editProvinsi}
                    closeModalHandler = {this.closeModalHandler}
                    provinsitest = {this.state.currentProvinsi}
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
export default ListProvinsi
