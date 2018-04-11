'use strict'

const { test } = use('Test/Suite')('Course')
const Course = use('App/Models/Course')

const term = 2, 
      room = 1,
      day = 1,
      start = '16:00',
      end = '17:00'

test(`#thisTimeIsAvailable with @term=${term} @day=${day} @room=${day} @start=${start} @end=${end} should return false`, async ({ assert }) => {
  const result = await Course.thisTimeIsAvailable(term, room, day, start, end);
  assert.equal(result, false);
})

test("#thisTimeIsAvailable should return typeof boolean", async ({ assert }) => {
  const result = await Course.thisTimeIsAvailable(term, room, day, start, end);
  assert.equal(typeof result, 'boolean');
})

