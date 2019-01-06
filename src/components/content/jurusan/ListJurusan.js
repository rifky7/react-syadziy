import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewJurusan from './ViewJurusan'
import CreateJurusan from './CreateJurusan'
import EditJurusan from './EditJurusan'
import DeleteJurusan from './DeleteJurusan'
import MUIDataTables from 'mui-datatables'

class ListJurusan extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateJurusan:false,
            jurusan:[],
            currentJurusan:{},
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
    viewModalHandler(kode_jurusan) {
        let tmp = {}
        this.state.jurusan.map((row) => {
            if (kode_jurusan == row.kode_jurusan) {
                tmp = ({kode_jurusan:row.kode_jurusan,nama_jurusan:row.nama_jurusan,kode_fakultas:row.kode_fakultas.nama_fakultas})
            }
        })
        this.setState({
            currentJurusan : tmp,
            viewJurusan : true
        })
    }
    deleteModalHandler(kode_jurusan) {
        let tmp = []
        this.state.jurusan.map((row) => {
            if (kode_jurusan == row.kode_jurusan) {
                tmp=({kode_jurusan:row.kode_jurusan,nama_jurusan:row.nama_jurusan,kode_fakultas:row.kode_fakultas,is_delete:true})
            }
        })
        this.setState({
            currentJurusan : tmp,
            deleteJurusan : true
        })
    }
    editModalHandler(kode_jurusan) {
        let tmp = {}
        this.state.jurusan.map((row) => {
            if (kode_jurusan == row.kode_jurusan) {
                tmp = ({kode_jurusan:row.kode_jurusan,nama_jurusan:row.nama_jurusan,kode_fakultas:row.kode_fakultas.kode_fakultas,nama_fakultas:row.kode_fakultas.nama_fakultas})
            }
        })
        this.setState({
            currentJurusan : tmp,
            editJurusan : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewJurusan : false,
            editJurusan : false,
            deleteJurusan : false
        })
        this.getListJurusan()
    }
    showHandler(){
        this.setState({showCreateJurusan:true})
    }
    closeHandler(){
        this.setState({showCreateJurusan:false})
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
        this.getListJurusan()
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
            showCreateJurusan:false,
            viewJurusan : false,
            editJurusan : false,
            deleteJurusan : false
        })
        this.getListJurusan()
    }
    render(){
        const columns = ["Kode Jurusan", "Nama Jurusan", "Kode Fakultas", "Action"];
        const data=[]

        this.state.jurusan.map(row =>
            
            {let tmp=[]
                tmp.push(row.kode_jurusan,row.nama_jurusan,row.kode_fakultas.nama_fakultas,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.kode_jurusan)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.kode_jurusan)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.kode_jurusan)}} class="fa fa-trash" style={{fontSize : '18px'}} />
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
                <h4>List Jurusan</h4>

                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateJurusan
                    create = {this.state.showCreateJurusan}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewJurusan
                    view = {this.state.viewJurusan}
                    closeModalHandler = {this.closeModalHandler}
                    jurusan = {this.state.currentJurusan}
                    />
                    <DeleteJurusan
                    delete = {this.state.deleteJurusan}
                    jurusan = {this.state.currentJurusan}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditJurusan
                    edit = {this.state.editJurusan}
                    closeModalHandler = {this.closeModalHandler}
                    jurusantest = {this.state.currentJurusan}
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
export default ListJurusan
