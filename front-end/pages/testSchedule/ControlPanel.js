

export default (props) => {

    const mapTermsOptios = props.terms.map(
        (term, index) => <option key={index} value={term.term_id}>{(parseInt(term.term_year) + 543) + "/" + term.term}</option>
    )


    const onChangeTerm = (evt) => props.changeTerm(evt.target.value)
    const onChangeType = (evt) => {
        evt.preventDefault();
        props.changeType(evt.target.dataset.value)
    }


    return (
        <div className="row">
            <div className="col-sm-12">
                <form className="form from-horizontal">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon">เทอม</span>
                                <select onChange={onChangeTerm} className="form-control">
                                    <option value={-1}>เลือกเทอม</option>
                                    {mapTermsOptios}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="btn-group">
                            <button onClick={onChangeType} data-value="Mid" 
                                className={["btn", "btn-default", props.typeSelected == 'Mid' ? 'active' : ''].join(" ")}>กลางภาค</button>
                            <button onClick={onChangeType} data-value="Final"
                            className={["btn", "btn-default", props.typeSelected == 'Final' ? 'active' : ''].join(" ")}>ปลายภาค</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}