'use strict'

const Model = use('Model')
const { DateTime } = use('luxon');

class Term extends Model {
  static get table() {
    return 'terms';
  }
  static get primaryKey() {
    return 'term_id';
  }

  static async all() {
    return await Term.query()
    .where("status", "A")
    .orderBy("term_year", "DESC")
    .orderBy("term")
    .fetch();
  }

  getTermYear(date) {
    return DateTime.fromJSDate(date).toFormat("yyyy");
  }
  getRegisterStart(date) {
    return DateTime.fromJSDate(date).toFormat("dd-LL-yyyy");
  }
  getRegisterEnd(date) {
    return DateTime.fromJSDate(date).toFormat("dd-LL-yyyy");
  }
}

module.exports = Term
