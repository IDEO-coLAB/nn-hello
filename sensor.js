
const moment = require('moment')
const Nomad = require('nomad-stream')
const utils = require('./utils')

const privateKey = utils.getPrivateKey()
const publishFrequencyInSeconds = 5

function message() {
	return `Hello from the Nomad test beacon`
}

const nomad = new Nomad(utils.nomadConfig)
nomad.start(privateKey).then(() => {
  console.log('id is', nomad.identity.id)
  setInterval(() => {
  	const msg = message()
  	console.log('publishing:', msg)
    nomad.publish(msg)
    .catch(err => {
      console.log(`Error: ${err}`)
    })
  }, publishFrequencyInSeconds * 1000)  
})