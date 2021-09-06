const fs = require('fs')


// let rawData = fs.readFileSync('AllPacific.json')
let rawData = fs.readFileSync('fulldata.json')
let pacificData = JSON.parse(rawData)
pacificData = pacificData.PacificEmployment
// console.log(pacificData)


// go through every object in the array
// find the location type, make a list??
let outputObj = {
  name: "Pacific Work",
  children: []
}
// change this back to pacificData.length later 
for (let i = 0; i < pacificData.length; i++) {
  if (isNaN(parseInt(pacificData[i].total))) {
    continue
  }
  // this is where we will temporarily create whole tree of location types.
  var locType = null;
// check if locationType already exists;
  for(let j = 0; j < outputObj.children.length; j++) {
    if (outputObj.children[j].name == pacificData[i].locationType) {
      // found it! store it temporarily so we can check next level
      locType = outputObj.children[j];
      break;
    }
  }

  if (locType == null) {
    // didn't find it, so start to build new object using temp storage variable
    locType = {
      name: pacificData[i].locationType,
      children: []
    }
    // add to object.
    outputObj.children.push(locType);
  }
  
  // now see if we can find location exists in locType.children, create if not
var loc = null;
// for loop through locType.children... look for pacificData[i].location
  for(let k = 0; k < locType.children.length; k++) {
    if (locType.children[k].name == pacificData[i].location) {
      // found, store in loc temporarily
      loc = locType.children[k];
    }
  }

  if (loc == null) {
    // didn't find it, add to loc set
    loc = {
      name: pacificData[i].location,
      children: []
    }
    // add to object
    locType.children.push(loc)
  } 
  // for each level, we basically create a variable, run a for loop, do a null state, then push it to the level above.
  // major level
  var major = null;
  
  // for loop for loc.children, look for pacificData.major
  for (let m = 0; m < loc.children.length; m++) {
    if (loc.children[m].name == pacificData[i].major) {
      // found, store in major temp
      major = loc.children[m];
    }
  }

  if (major == null) {
    // didn't find, add to major set
    major = {
      name: pacificData[i].major,
      children: []
    }
    // add to object
    loc.children.push(major)
  }
 
  // minor level
  var minor = null

  // for loop for major.children, look for pacificData.minor
  for (let n = 0; n < major.children.length; n++) {
    if (major.children[n].name == pacificData[i].minor) {
      // found, store
      minor = major.children[n]
    }
  }
  // not found
  if (minor == null) {
    minor = {
      name: pacificData[i].minor,
      children: []
    }
  // add to object
  major.children.push(minor)  
  }
  var occupation = {
    name: pacificData[i].occupation,
    total: parseInt(pacificData[i].total)
  }
  
  var hasAus = occupation.name.indexOf('(Aus)')
  if (hasAus !== -1) {
    // false, aus exists
    console.log(occupation.name + hasAus)
    occupation.name = occupation.name.slice((hasAus + 8), (occupation.name.length - 5))
    console.log(occupation.name)
  }
  
  if (isNaN(parseInt(pacificData[i].median))) {
    occupation.median = pacificData[i].median
  }
  else {
    occupation.median = parseInt(pacificData[i].median)
  }
  if (isNaN(parseInt(pacificData[i].mean))) {
    occupation.mean = pacificData[i].mean
  }
  else {
    occupation.mean = parseInt(pacificData[i].mean)
  }
  
  // finally, for every minor child, add an object.
  minor.children.push(occupation)
}

// fs.writeFile('nested.json', JSON.stringify(outputObj), function (err){
//   if (err) return console.log(err);
//   console.log('outputObj > nested.json');
// })

// fs.writeFile('nestedsample.json', JSON.stringify(outputObj.children[0].children[0]), function (err){
//   if (err) return console.log(err);
//   console.log('outputObj > samplenested.json');
// })

// console.log(outputObj.children[3])
// console.log(outputObj.children[0].children[0].children[0].children[0])






