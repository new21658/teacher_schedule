'use strict'

let Term = use("App/Models/Term");
let { json_res, json_res_error } = use("App/Utils/Response");
let { validate } = use('Validator');
let { DateTime } = use('luxon');


// helpers
/**
 *  @year:int eg. 2018
    @term:int eg. 2
*/
async function isTermIsDuplicated(year, term) {
  let dupTerm = await Term.query().whereRaw('year(term_year) = ?', [year]).where('term', '=', term).first();
  return dupTerm !== null;
}

// end helpers

class AdminTermController {

  async index({ view }) {
    return view.render('admin.term');
  }

  async termAll({ request }) {
    try {

      let q = request.get()
      let year = q.year || ''
      let term = q.term || ''
      let start = q.start || ''
      let end = q.end || ''
      let status = q.status || ''

      let terms = await Term.query()
        .where('term_year', 'like', `%${year}%`)
        .where('term', 'like', `%${term}%`)
        .where('register_start', 'like', `%${start}%`)
        .where('register_end', 'like', `%${end}%`)
        .where('status', 'like', `%${status}%`)
        .orderByRaw('year(term_year) desc')
        .orderBy('term', 'DESC')
        .fetch();
      return json_res(terms);

    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async termSearch({ request }) {
    var search = request.get('search').search;
    try {
      var items = await Term.query()
        .where(function () {
          this.whereRaw('year(term_year) like  ?', ['%'+search+'%'])
        })
        .fetch();
      return json_res(items);
    } catch (ex) {
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
      if (validation.fails()) {
        var message = validation.message()[0].message;
        return json_res_error(message);
      }

      var format = "dd-LL-yyyy";
      var toSQLFormat = 'yyyy-LL-dd'

      // verify duplicate term
      const isTermDupplicate = await isTermIsDuplicated(
        request.input('year'),
        request.input('term')
      )

      if(isTermDupplicate) {
        return json_res_error("This term has already exist");
      }


      var term = new Term();
      term.term_year = DateTime.fromString(request.input('year').trim(), 'yyyy').toFormat(toSQLFormat);
      term.term = request.input('term').trim();
      term.register_start = DateTime.fromString(request.input('start_date').trim(), format).toFormat(toSQLFormat);
      term.register_end = DateTime.fromString(request.input('end_date').trim(), format).toFormat(toSQLFormat);
      await term.save();

      return json_res("Term Added");

    } catch (ex) {
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

      if (validation.fails()) {
        var message = validation.message()[0].message;
        return json_res_error(message);
      }

      var format = "dd-LL-yyyy";
      var toSQLFormat = 'yyyy-LL-dd'

      let isTermDupplicate = await isTermIsDuplicated(request.input('year'), request.input('term'));

      if(isTermDupplicate) {
        return json_res_error("This term has already exist");
      }

      var term = await Term.find(request.input('id'));
      term.term_year = DateTime.fromString(request.input('year').trim(), 'yyyy').toFormat(toSQLFormat);
      term.term = request.input('term').trim();
      term.register_start = DateTime.fromString(request.input('start_date').trim(), format).toFormat(toSQLFormat);
      term.register_end = DateTime.fromString(request.input('end_date').trim(), format).toFormat(toSQLFormat);
      await term.save();

      return json_res("Term Updated");

    } catch (ex) {
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
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }


}




module.exports = AdminTermController
