'use strict'

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const execSync = require('child_process').execSync;
const modulesFolder = execSync('npm root -g', { encoding: 'utf8' }).trim();

// Get Global Modules
const getModuleInfo = () =>

// Find globalally installed modules
new Promise((resolve, reject) => 
glob('*/package.json', { cwd: modulesFolder }, (err, matches) => {
  if (err) {
    reject(err)
  }
  else {
    resolve(matches)
  }
}))

// Read the module information
.then(matches => matches.map(file =>
new Promise((resolve, reject) => {
  fs.readFile(path.join(modulesFolder, file), 'utf8', (err, data) => {
    if (err) {
      reject(err)
    }
    else {
      resolve(JSON.parse(data))
    }
  })
})))
.then(promises => Promise.all(promises))

// Clean the information to be passed
.then(modules => modules.map(module => {
  return {
    name: module.name,
    version: module.version
  }
}))

const search = query => {
  return getModuleInfo().then(modules => {
    return modules.filter(module => {
      return !query || module.name.match(query)
    })
    
  })
}

module.exports = search