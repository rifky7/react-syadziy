import React from 'react'
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import ViewUser from './ViewUser'
import CreateUser from './CreateUser'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import MUIDataTables from "mui-datatables"

class ListUser extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateUser:false,
            user:[],
            currentUser:{},
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
    viewModalHandler(id_user) {
        let tmp = {}
        this.state.user.map((row) => {
            if (id_user == row.id_user) {
                tmp = row
            }
        })
        this.setState({
            currentUser : tmp,
            viewUser : true
        })
    }
    deleteModalHandler(id_user) {
        let tmp = {}
        this.state.user.map((row) => {
            if (id_user == row.id_user) {
                tmp=({id_user:row.id_user,username:row.username,password:row.password,is_delete:true})
            }
        })
        this.setState({
            currentUser : tmp,
            deleteUser : true
        })
    }
    editModalHandler(id_user) {
        let tmp = {}
        this.state.user.map((row) => {
            if (id_user == row.id_user) {
                tmp =row
            }
        })
        this.setState({
            currentUser : tmp,
            editUser : true
        })
    }
    closeModalHandler() {
        this.setState({
            viewUser : false,
            editUser : false,
            deleteUser : false
        })
        this.getListUser()
    }
    showHandler(){
        this.setState({showCreateUser:true})
    }
    closeHandler(){
        this.setState({showCreateUser:false})
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
    getListUser() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER.LISTUSER, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                user: response.data
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
        this.getListUser()
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
            showCreateUser: false,
            viewUser : false,
            editUser : false,
            deleteUser : false
        })
        this.getListUser()
    }
    render(){
        const columns = ["No", "Username", "Action"];
        const data=[]

        this.state.user.map(row =>
            
            {let tmp=[]
                tmp.push(row.id_user,row.username,<Link to='#'>
                    <span onClick = {() => {this.viewModalHandler(row.id_user)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.editModalHandler(row.id_user)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />

                    <span onClick = {() => {this.deleteModalHandler(row.id_user)}} class="fa fa-trash" style={{fontSize : '18px'}} />    
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
                <h4>List User</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateUser
                    create = {this.state.showCreateUser}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <ViewUser
                    view = {this.state.viewUser}
                    closeModalHandler = {this.closeModalHandler}
                    user = {this.state.currentUser}
                    />
                    <DeleteUser
                    delete = {this.state.deleteUser}
                    user = {this.state.currentUser}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                    />
                    <EditUser
                    edit = {this.state.editUser}
                    closeModalHandler = {this.closeModalHandler}
                    usertest = {this.state.currentUser}
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
export default ListUser
