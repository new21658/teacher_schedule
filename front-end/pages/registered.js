import wrapper from "../components/Page";

import ControlPanel from "../components/registered/ControlPanel"

import CourseList from "../components/registered/CourseList"


const Registered = () => {
    return (
        <div className="container">
            <CourseList />
        </div>
    );
}


export default wrapper(Registered);