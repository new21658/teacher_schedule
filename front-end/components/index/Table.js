import { Popover, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DateTime } from "luxon"

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
        diff = mapTimstampToMinute(diff);
        return diff;
    }

    const mapOffsetTime = (start) => {
        return width + mapTimstampToMinute(start - startTime);
    }

    const mapTimes = props.intervals.map((inv, index) => {
        return (
                <div key={index} className="schedule-col-h" style={{ width: width + "px" }}>
                    { inv.start.toFormat('HH:mm') }
                </div>
        );
    })



    const onSelectTime = (evt) => {
        props.selectTime(evt.target.dataset.day, evt.target.dataset.start_time, evt.target.dataset.end_time);
    }

    const mapDays = props.days.map((day, index) => {
        const dayOfWeek = index + 1;
        const emptyBox = props.intervals.map((inv, index) => {
            const startFormated = inv.start.toFormat('HH:mm');
            const endFormated = inv.end.toFormat('HH:mm');
            return (
                    <OverlayTrigger trigger="focus" key={index}   placement="top" overlay={(
                        <Popover id="popover-positioned-top" >
                            {
                                props.schedule.isOverlaps 
                                ? <strong>เวลา <color className="text-danger">{  day + ' ' + startFormated + "-" + endFormated}</color> ไม่สามารถเลือกได้ กรุณาเลือกเวลาอื่น</strong>
                                :<strong>คุณได้เลือกเวลา <color className="tch-text-yellow">{  day + ' ' + startFormated + "-" + endFormated}</color> แล้ว</strong>
                            }
                        </Popover>
                    )}>
                        <div
                        tabIndex={0}
                        onClick={onSelectTime}
                        data-day={dayOfWeek}
                        data-start_time={startFormated} 
                        data-end_time={endFormated} 
                        className="schedule-col" style={{ width: width + "px" }}>
                        </div>
                    </OverlayTrigger>
                    )
        });
        return (
            <div key={index} className="schedule-row">
                <div className="schedule-col-h" style={{ width: width + "px" }}>
                    { day }
                </div>
                {
                    (() => {
                        const schedule = props.schedule;
                        if(schedule.daySelected == -1 || schedule.startTimeSelected == -1 || schedule.endTimeSelected == -1) {
                            return null;
                        }
                        const shouldRender = schedule.daySelected == dayOfWeek;
                        const luxonStart = DateTime.fromFormat(schedule.startTimeSelected, 'HH:mm')
                        const luxonEnd = DateTime.fromFormat(schedule.endTimeSelected, 'HH:mm')
                        const widthPx = mapTimeToPx(luxonStart, luxonEnd);
                        return (
                            shouldRender ? (
                            <div 
                            key={index} 
                            style={{ width: widthPx, marginLeft: mapOffsetTime(luxonStart) }} 
                            className={[
                                "highlight-table-selected",
                                schedule.isOverlaps ? "active" : ""
                            ].join(" ")}>
                            { luxonStart.toFormat('HH:mm') + "-" + luxonEnd.toFormat('HH:mm') }
                            </div>) : null
                        );
                    })()
                }
                {
                    props.courses.map((course, _index) => {
                        const widthPx = mapTimeToPx(course.start_time, course.end_time);
                        const shouldRender = course.day == dayOfWeek;
                        const tooltip = (
                            <Tooltip id="tooltip">
                              <strong>วิชา { course.subject.subject_code }</strong> อาจารย์ { course.teacher.teacher_code }
                            </Tooltip>
                          );
                          
                        return (
                            shouldRender ?
                            <OverlayTrigger placement="top" overlay={tooltip}>
                            <div 
                                key={_index} 
                                style={{ width: widthPx, marginLeft: mapOffsetTime(course.start_time) }} className="highlight-table">
                                <span>{ course.room.study_room_code }</span>
                            </div>
                            </OverlayTrigger>
                            : null
                        );
                    })
                }
                {emptyBox}               
            </div>
        );
    });

    return (
        <div className="row">
            {
                props.schedule.startTimeSelected != -1 ?
                props.schedule.endTimeSelected != -1 ?
                props.schedule.daySelected != -1 ?
                props.schedule.isOverlaps ?
                (<p className="text-center col-sm-12">
                    <strong className="text-right text-danger"><i className="fas fa-times-circle"></i> คุณไม่สามารถจองเวลานี้ได้ เนื่องจากถูกจองไว้แล้ว กรุณาเลือกเวลาอื่น</strong>
                </p>) :
                (<p className="text-center col-sm-12">
                    <strong className="text-right text-success"><i className="fas fa-check-circle"></i> คุณสามารถจองเวลานี้ได้</strong>
                </p>) : null : null : null
            }
            <div className="table-responsive col-sm-12">
                <div className="schedule">
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
