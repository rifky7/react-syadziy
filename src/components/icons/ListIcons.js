import React from 'react'
import apiconfig from '../../configs/api.config.json'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import CreateIcons from './CreateIcons'
import DeleteIcons from './DeleteIcons'
import MUIDataTables from "mui-datatables"

class ListIcons extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showCreateIcons:false,
            icons:[],
            currentIcons:{},
            alertData: {
                status: 0,
                message: ''
            },
            isRequest: false
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
    viewModalHandler(id_menu) {
        let tmp = {}
        this.state.menu.map((row) => {
            if (id_menu == row.id_menu) {
                tmp = row
            }
        })
        this.setState({
            currentMenu : tmp,
            viewMenu : true
        })
    }
    deleteModalHandler(nama_icons) {
        let tmp = {}
        this.state.icons.map((row) => {
            if (nama_icons == row.nama_icons) {
                tmp=({nama_icons:row.nama_icons,is_delete:true})
            }
        })
        this.setState({
            currentIcons : tmp,
            deleteIcons : true
        })
    }
    editModalHandler(id_menu) {
        let tmp = {}
        this.state.menu.map((row) => {
            if (id_menu == row.id_menu) {
                tmp =row
            }
        })
        this.setState({
            currentMenu : tmp,
            editMenu : true
        })
    }
    closeModalHandler() {
        this.setState({
            deleteIcons : false
        })
        this.getListIcons()
    }
    showHandler(){
        this.setState({showCreateIcons:true})
    }
    closeHandler(){
        this.setState({showCreateIcons:false})
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
    getListIcons() {
        axios({method:'GET',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.ICON.LISTICON, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then((response)=>{
            this.setState({
                icons: response.data
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
        this.getListIcons()
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
            showCreateIcons: false,
            deleteIcons : false
        })
        this.getListIcons()
    }
    render(){
        const columns = ["Nama Icon", "Icons", "Action"];
        const data = []

        this.state.icons.map(row =>
            
            {let tmp=[]
                tmp.push(row.nama_icons,<span class={row.nama_icons}></span>,<Link to='#'>
                    <span onClick = {() => {this.deleteModalHandler(row.nama_icons)}} class="fa fa-trash" style={{fontSize : '18px'}} />    
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
                <h4>List Icons</h4>
                {
                    (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
                }
                {
                    (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
                }
                    <button type="button" class="btn btn-primary float-right"
                    onClick = {this.showHandler}><span class="fa fa-plus"></span> Add </button>

                    <CreateIcons
                    create = {this.state.showCreateIcons}
                    closeHandler={this.closeHandler} 
                    modalStatus = {this.modalStatus}
                    />
                    <DeleteIcons
                    delete = {this.state.deleteIcons}
                    icons = {this.state.currentIcons}
                    closeModalHandler = {this.closeModalHandler}
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
export default ListIcons
