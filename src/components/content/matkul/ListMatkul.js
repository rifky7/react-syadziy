import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewMatkul from './ViewMatkul'
import CreateMatkul from './CreateMatkul'
import EditMatkul from './EditMatkul'
import DeleteMatkul from './DeleteMatkul'
import MUIDataTables from 'mui-datatables'

class ListMatkul extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateMatkul:false,
            matkul:[],
            currentMatkul:{},
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
    viewModalHandler(kode_matkul) {
        let tmp = {}
        this.state.matkul.map((row) => {
            if (kode_matkul == row.kode_matkul) {
                tmp = row
            }
        })
        this.setState({
            currentMatkul : tmp,
            viewMatkul : true
        })
    }
    deleteModalHandler(kode_matkul) {
        let tmp = {}
        this.state.matkul.map((row) => {
            if (kode_matkul == row.kode_matkul) {
                tmp=({kode_matkul:row.kode_matkul,
                nama_matkul:row.nama_matkul,
                kode_jurusan:row.kode_jurusan,
                semester:row.semester,
                sks:row.sks,
                is_delete:true})
            }
        })
        this.setState({
            currentMatkul : tmp,
            deleteMatkul : true
        })
    }
    editModalHandler(kode_matkul) {
        let tmp = {}
        this.state.matkul.map((row) => {
            if (kode_matkul == row.kode_matkul) {
                tmp =row
            }
        })
        this.setState({
            currentMatkul : tmp,
            editMatkul : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewMatkul : false,
            editMatkul : false,
            deleteMatkul : false
        })
        this.getListMatkul()
    }
    showHandler(){
        this.setState({showCreateMatkul:true})
    }
    closeHandler(){
        this.setState({showCreateMatkul:false})
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
    getListMatkul() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.MATKUL.LISTMATKUL, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                matkul: response.data
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
        this.getListMatkul()
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
            showCreateMatkul : false,
            viewMatkul : false,
            editMatkul : false,
            deleteMatkul : false
        })
        this.getListMatkul()
    }
    render(){
        const columns = ["Kode Matkul", "Nama Matkul", "Semester", "Jumlah SKS", "Action"];
        const data=[]

        this.state.matkul.map(row =>
            
            {let tmp=[]
                tmp.push(row.kode_matkul,row.nama_matkul,row.semester,row.sks,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.kode_matkul)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.kode_matkul)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.kode_matkul)}} class="fa fa-trash" style={{fontSize : '18px'}} />
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
                <h4>List Mata Kuliah</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateMatkul
                    create = {this.state.showCreateMatkul}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewMatkul
                    view = {this.state.viewMatkul}
                    closeModalHandler = {this.closeModalHandler}
                    matkul = {this.state.currentMatkul}
                    />
                    <DeleteMatkul
                    delete = {this.state.deleteMatkul}
                    matkul = {this.state.currentMatkul}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditMatkul
                    edit = {this.state.editMatkul}
                    closeModalHandler = {this.closeModalHandler}
                    matkultest = {this.state.currentMatkul}
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
export default ListMatkul
