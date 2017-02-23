const path = require('path')
const os = require('os')
const fs = require('fs')

const nomadConfig = {
  db: `${process.cwd()}/store/nomad-store`,
  repo: `${os.tmpdir()}/nomad-store/${Math.random().toString().substring(2, 8)}`,
  ipfs: { bits: 2048, emptyRepo: true }
}

const getPrivateKey = () => {
	const config = JSON.parse(fs.readFileSync('./store/ipfs-store/config'))
	return config.Identity.PrivKey
}

module.exports = {
	nomadConfig, getPrivateKey
}
