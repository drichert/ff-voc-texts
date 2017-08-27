var fs = require("fs")
var glob = require("glob")

module.exports = () => {
  let texts = []
  let globPtn = __dirname + "/text/*.txt"

  let getText = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: "utf8" }, (err, data) => {
        if(err) reject(err)
        else resolve(data.split(/(\s+)/))
      })
    })
  }

  return new Promise((resolve, reject) => {
    glob(globPtn, (err, files) => {
      if(err) reject(err)
      else resolve(Promise.all(files.map(getText)))
    })
  })
}
