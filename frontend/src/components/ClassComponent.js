import React, {Component} from "react";
 
class ClassRoom extends Component {
 
    constructor (props) {
 
        console.log(props);
 
        super(props);
 
        this.state = {
            teacherName: props.name,
            pen: ''
        }
    }
 
    componentDidMount () {
        alert('Teacher Aavi');
    }
 
    getMePen (pencolor) {
        console.log(pencolor);
        this.setState({pen:pencolor});
    }
 
 
    render () {
        // logic
        const {
            teacherName,
            pen
        } = this.state;

        // const teacherName = this.state.teacherName;
        return (
            <h1>
                GoodMorning {teacherName}
                <button onClick={()=>this.getMePen('black')}>
                    Get Me Pen
                </button>
                { pen !== '' && (
                    <h1>Teacher {pen} pen leke aai</h1>
                )}
            </h1>
        );
 
    }
}
 
export default ClassRoom;





