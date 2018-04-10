const expect = require("chai").expect;
const Course = require("../../app/Models/Course");

describe('Models/Course', function() {

    describe('#thisTimeIsAvailable', function() {

        it('should return true when start=13:00 and end=15:00', (done) => {
            const start = '13:00'
            const end = '15:00'
            Course.thisTimeIsAvailable(2, 8, 1, 1, start, end).then((rs) => {
                expect(rs).to.be.true;
                done();
            })
            .catch(error => done(error))

        })


    })



})