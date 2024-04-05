import React, {Component} from "react";
 
class Student extends Component {
 
    constructor (props) {
 
        super(props);
 
        this.state = {
            studentList: [],
            loading: true,
            sid: null,
            userData: null
        }
    }
 
    updateLoading = (value) => {
        this.setState({loading: value});
    }
 
    componentDidMount = () => {
        this.fetchUserDataFun();
    }
 
    fetchUserDataFun = () => {
        this.updateLoading(true);
        var checkxhr = new XMLHttpRequest();
        var check_json_obj, checkstatus = false;
        checkxhr.open("GET", "http://localhost:8000/api/checkLogin", true);
        checkxhr.onload = function (e) {
            this.setState({getData:false});
            if (checkxhr.readyState === 4) {
                if (checkxhr.status === 200) {
                    var check_json_obj = JSON.parse(checkxhr.responseText);
                    if (check_json_obj.message == 'success') {
                        var xhr = new XMLHttpRequest();
                        var json_obj, status = false;
                        xhr.open("GET", "http://localhost:8000/api/getList", true);
                        xhr.onload = function (e) {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                   
                                    var json_obj = JSON.parse(xhr.responseText);
                                    if (json_obj.message == 'success') {
                                        status = true;
                                        this.setState({
                                            loading: false,
                                            studentList: json_obj.data                                        
                                        });
                                    } else {
                                        window.location.href = '/';
                                    }
                                } else {
                                    console.error(xhr.statusText);
                                }
                            }
                        }.bind(this);
                        xhr.onerror = function (e) {
                            console.error(xhr.statusText);
                        };
                        xhr.send(null);
                    } else {
                        window.location.href = '/';
                    }
                } else {
                    console.error(checkxhr.statusText);
                }
            }
        }.bind(this);
        checkxhr.onerror = function (e) {
            console.error(checkxhr.statusText);
        };
        checkxhr.send(null);
    }
 
 
    render () {
        const studentListData = this.state.studentList;
 
        const {
            loading
        } = this.state;
 
        return(
            <div className="container">
                <button onClick={(e) => this.fetchUserDataFun()} className="btn btn-primary"> Get Data Again</button>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            { loading == true ?
                                <h1 className="text-center">Loading...</h1>
                            :
                                <>
                                    {(studentListData !== null && studentListData.length > 0) ?
                                        <table className="table table-bordered table-stripped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.studentList.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phone}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        :
                                        <h1 className="text-center">No Data Available</h1>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
 
}
 
export default Student;