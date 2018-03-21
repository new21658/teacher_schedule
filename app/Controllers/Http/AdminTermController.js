'use strict'

let Term = use("App/Models/Term");
let { json_res, json_res_error } = use("App/Utils/Response");
let { validate } = use('Validator');
let { DateTime } = use('luxon');

class AdminTermController {

  async index({ view }) {
    return view.render('admin.term');
  }

  async termAll({ request }) {
    try {
      let terms = await Term.all();
      return json_res(terms);

    } catch(ex) {
      return json_res_error(ex.toString());
    }
  }

  async termSearch({ request }) {
    var search = request.get('search').search;
    try{
        var items = await Term.query()
        .where(function() {
          this.where('term_year', 'like',  search + '%')
          this.orWhere('term', 'like', search + '%')
          this.orWhere('register_start', 'like', '%' + search + '%')
          this.orWhere('register_end', 'like', '%' + search + '%')
        })
        .fetch();
        return json_res(items);
    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async addTerm({ request }) {
    try {
      let validation = await validate(request.all(), {
        year: 'required',
        term: 'required',
        start_date: 'required',
        end_date: 'required'
      });
      if(validation.fails()) {
        var message = validation.message()[0].message;
        return json_res_error(message);
      }

      var term = new Term();
      var format = "dd-LL-yyyy";
      term.term_year = DateTime.fromString(request.input('year').trim(), 'yyyy').toSQL();
      term.term = request.input('term').trim();
      term.register_start = DateTime.fromString(request.input('start_date').trim(), format).toSQL();
      term.register_end = DateTime.fromString(request.input('end_date').trim(), format).toSQL();
      await term.save();

      return json_res("Term Added");

    } catch(ex) {
      return json_res_error(ex.toString());
      console.log(ex);
    }
  }

  async updateTerm({ request }) {
    try {
      let validation = await validate(request.all(), {
        year: 'required',
        term: 'required',
        start_date: 'required',
        end_date: 'required'
      });

      if(validation.fails()) {
        var message = validation.message()[0].message;
        return json_res_error(message);
      }

      var term = await Term.find(request.input('id'));
      var format = "dd-LL-yyyy";
      term.term_year = DateTime.fromString(request.input('year').trim(), 'yyyy').toSQL();
      term.term = request.input('term').trim();
      term.register_start = DateTime.fromString(request.input('start_date').trim(), format).toSQL();
      term.register_end = DateTime.fromString(request.input('end_date').trim(), format).toSQL();
      await term.save();

      return json_res("Term Updated");

    } catch(ex) {
      return json_res_error(ex.toString());
      console.log(ex);
    }
  }

  async updateStatusTerm({ request }) {
    try {
        var term = await Term.find(request.input('id'));
        term.status = request.input('status');
        await term.save();
        return json_res("Status updated");
    } catch(ex) {
        return json_res_error(ex.toString());
    }
  }


}




module.exports = AdminTermController
