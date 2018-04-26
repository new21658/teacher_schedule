import React, { Component } from "react";

export default class ControlPanel extends Component {


    // static getDerivedStateFromProps(nextProps, prevProps) {
    //     console.log("getDerivedStateFromProps nextProps:", nextProps, 'prevState', prevProps);
    //     if(nextProps.termSelected == -1) 
    //     return nextProps;
    // }

    // componentDidMount() {
    //     console.log("ComtrolPanel componentDidMount", this.props);
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log("ComtrolPanel componentDidUpdate", 'prevProps', this.props, 'currentProps', this.props);
    //     if(this.props.terms.length > 0 && this.props.termSelected === -1) {
    //         console.log("set default term");
    //         this.props.changeTerm(this.props.terms[this.props.terms.length -1].term_id) // set default term
    //     }
    // }


    render() {

        const mapTermsOptios = this.props.terms.map(
            (term, index) => <option key={index} value={term.term_id}>{(parseInt(term.term_year) + 543) + "/" + term.term}</option>
        )

        const mapRoomsOptions = this.props.rooms.map(
            (room, index) => <option key={index} value={room.study_room_id}>{room.study_room_code}</option>
        )


        const onChangeTerm = (evt) => this.props.changeTerm(evt.target.value)

        const onChangeRoom = (evt) => this.props.changeRoom(evt.target.value)



        return (
            <div className="row">
                <div className="col-sm-12">
                    <form className="form from-horizontal">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="label-control">เลือกเทอม</label>
                                <select value={this.props.termSelected} onChange={onChangeTerm} className="form-control">
                                    <option value={-1}>เลือกเทอม</option>
                                    {mapTermsOptios}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="label-control">เลือกห้อง</label>
                                <select onChange={onChangeRoom} className="form-control">
                                    <option value={-1}>เลือกห้อง</option>
                                    {mapRoomsOptions}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}