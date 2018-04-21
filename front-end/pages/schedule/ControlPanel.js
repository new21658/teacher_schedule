

export default (props) => {

    const mapTermsOptios = props.terms.map(
        (term, index) => <option key={index} value={term.term_id}>{ (parseInt(term.term_year) + 543) + "/" + term.term }</option>
    )

    const mapRoomsOptions = props.rooms.map(
        (room, index) => <option key={index} value={room.study_room_id}>{ room.study_room_code }</option>
    )


    const onChangeTerm = (evt) => props.changeTerm(evt.target.value)
    
    const onChangeRoom = (evt) => props.changeRoom(evt.target.value)



    return (
        <div className="row">
            <div className="col-sm-12">
                <form className="form from-horizontal">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="label-control">เลือกเทอม</label>
                            <select onChange={onChangeTerm} className="form-control">
                                <option value={-1}>เลือกเทอม</option>
                                { mapTermsOptios }
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="label-control">เลือกห้อง</label>
                            <select onChange={onChangeRoom} className="form-control">
                                <option value={-1}>เลือกห้อง</option>
                                { mapRoomsOptions }
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}