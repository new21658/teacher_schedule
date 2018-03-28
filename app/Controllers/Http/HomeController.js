'use strict'

let Room = use('App/Models/StudyRoom');
let Terms = use('App/Models/Term');

class HomeController {
    async index({ view }) {
        try{
        var rooms = await Room.all();
        var terms = await Terms.all();
        return view.render('user.home', {
            rooms: JSON.stringify(rooms),
            terms: JSON.stringify(terms)
        });
    } catch(ex) {
        console.log(ex);
    }
    }
}

module.exports = HomeController
