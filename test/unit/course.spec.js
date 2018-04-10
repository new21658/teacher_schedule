'use strict'

const { test } = use('Test/Suite')('Course')
const Course = use('App/Models/Course')

const term = 2, 
      teacher = 8, 
      subject = 1, 
      room = 1,
      start = '16:00',
      end = '17:00'

test("#thisTimeIsAvailable with @start=16:00 @end=17:00 should return true", async ({ assert }) => {
  const result = await Course.thisTimeIsAvailable(term, teacher, subject, room, start, end);
  assert.equal(result, true);
})

test("#thisTimeIsAvailable should return typeof boolean", async ({ assert }) => {
  const result = await Course.thisTimeIsAvailable(term, teacher, subject, room, start, end);
  assert.equal(typeof result, 'boolean');
})

