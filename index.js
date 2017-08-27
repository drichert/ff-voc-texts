var fs = require("fs")
var glob = require("glob")

module.exports = {
  promise: () => {
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
  },

  sync: () => {
    let texts = []
    let globPtn = __dirname + "/text/*.txt"

    let getText = (path) => {
      return fs.readFileSync(path, {
        encoding: "utf8"
      }).split(/(\s+)/)
    }

    let files = glob.sync(globPtn)

    return files.map(getText)
  }
}
