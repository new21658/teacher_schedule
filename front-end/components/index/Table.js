
const Table = (props) => {
    const startTime = props.startTime;
    const endTime = props.endTime;
    let width = 60;
    let widthOfTable = 60 * props.intervals.length;

    const mapTimstampToMinute = (ts) => {
        return (ts / 1000) / 60;
    } 
    
    const mapTimeToPx = (start, end) => {
        let diff = end - start; // return timestamps
        console.log("-----diff------", diff)
        diff = mapTimstampToMinute(diff);
        // const startPx = start.minute;
        // const endPx = end.minute;
        // const diff = startPx - endPx;
        return diff;
    }

    const mapOffsetTime = (start) => {
        console.log("---------mapOffsetTime-----------", width + startTime.minute + start.minute);
        return width + mapTimstampToMinute(start - startTime);
    }

    // const mapCourses = props.courses.map((course, index) => {
    //     const widthPx = mapTimeToPx(course.start_time, course.end_time);
    //     return (
    //         <div style={{ width: widthPx }} className="highlight-table">
    //             { course.start_time.toFormat('HH:mm') }
    //         </div>
    //     );
    // });

    const mapTimes = props.intervals.map((inv, index) => {
        return (
                <div key={index} className="schedule-col-h" style={{ width: width + "px" }}>
                    { inv.start.toFormat('HH:mm') }
                </div>
        );
    })

    const mapDays = props.days.map((day, index) => {
        const emptyBox = props.intervals.map((item, index) => {
            return (<div key={index} className="schedule-col" style={{ width: width + "px" }}></div>)
        });
        return (
            <div key={index} className="schedule-row">
                <div className="schedule-col-h" style={{ width: width + "px" }}>
                    { day }
                </div>
                {
                    props.courses.map((course, _index) => {
                        const widthPx = mapTimeToPx(course.start_time, course.end_time);
                        const dayOfWeek = index + 1;
                        const shouldRender = course.date.weekday == dayOfWeek;
                        return (
                            shouldRender ?
                            <div key={_index} style={{ width: widthPx, marginLeft: mapOffsetTime(course.start_time) }} className="highlight-table">
                                { course.start_time.toFormat('HH:mm') }
                            </div> : null
                        );
                    })
                }
                {emptyBox}               
            </div>
        );
    });

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="table-responsive schedule">
                    <div className="schedule-row">
                        <div className="schedule-col-h" style={{ width: width + "px" }}>T/D</div>
                        { mapTimes }
                    </div>
                    { mapDays }
                </div>
            </div>
        </div>

    );
}

export default Table;
