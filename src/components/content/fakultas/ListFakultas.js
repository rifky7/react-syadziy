import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewFakultas from './ViewFakultas'
import CreateFakultas from './CreateFakultas'
import EditFakultas from './EditFakultas'
import DeleteFakultas from './DeleteFakultas'
import MUIDataTables from 'mui-datatables'

class ListFakultas extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateFakultas:false,
            fakultas:[],
            currentFakultas:{},
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
    viewModalHandler(kode_fakultas) {
        let tmp = {}
        this.state.fakultas.map((row) => {
            if (kode_fakultas == row.kode_fakultas) {
                tmp = row
            }
        })
        this.setState({
            currentFakultas : tmp,
            viewFakultas : true
        })
    }
    deleteModalHandler(kode_fakultas) {
        let tmp = []
        this.state.fakultas.map((row) => {
            if (kode_fakultas == row.kode_fakultas) {
                tmp=({kode_fakultas:row.kode_fakultas,nama_fakultas:row.nama_fakultas,is_delete:true})
            }
        })
        this.setState({
            currentFakultas : tmp,
            deleteFakultas : true
        })
    }
    editModalHandler(kode_fakultas) {
        let tmp = {}
        this.state.fakultas.map((row) => {
            if (kode_fakultas == row.kode_fakultas) {
                tmp =row
            }
        })
        this.setState({
            currentFakultas : tmp,
            editFakultas : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewFakultas : false,
            editFakultas : false,
            deleteFakultas : false
        })
        this.getListFakultas()
    }
    showHandler(){
        this.setState({showCreateFakultas:true})
    }
    closeHandler(){
        this.setState({showCreateFakultas:false})
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
        this.getListFakultas()
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
            showCreateFakultas:false,
            viewFakultas : false,
            editFakultas : false,
            deleteFakultas : false
        })
        this.getListFakultas()
    }
    render(){
        const columns = ["Kode Fakultas", "Nama Fakultas", "Action"];
        const data=[]

        this.state.fakultas.map(row =>
            
            {let tmp=[]
                tmp.push(row.kode_fakultas,row.nama_fakultas,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.kode_fakultas)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.kode_fakultas)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.kode_fakultas)}} class="fa fa-trash" style={{fontSize : '18px'}} />
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
                <h4>List Fakultas</h4>

                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateFakultas
                    create = {this.state.showCreateFakultas}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewFakultas
                    view = {this.state.viewFakultas}
                    closeModalHandler = {this.closeModalHandler}
                    fakultas = {this.state.currentFakultas}
                    />
                    <DeleteFakultas
                    delete = {this.state.deleteFakultas}
                    fakultas = {this.state.currentFakultas}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditFakultas
                    edit = {this.state.editFakultas}
                    closeModalHandler = {this.closeModalHandler}
                    fakultastest = {this.state.currentFakultas}
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
export default ListFakultas
