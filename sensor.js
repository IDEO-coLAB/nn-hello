const Nomad = require('nomad-stream')
const moment = require('moment')
const nomad = new Nomad()

let instance = null
const birthdate = moment('2017-02-03')

const publishFrequency = 10 * 1000

function getMessage() {
	return `Hello from the Nomad floodsub beacon!\nFloodsub was born ${birthdate.fromNow()} on ${birthdate.format('MMMM Do, YYYY')}.\nThis message was sent at ${moment().format('h:mm a')} UTC.\n`
}

nomad.start().then(() => {
  console.log('id is', nomad.identity.id)
  setInterval(() => {
    nomad.publish(getMessage())
    .catch(err => {
      console.log(`Error: ${err}`)
    })
  }, publishFrequency)  
})