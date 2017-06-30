/* creates gulpfile in project so the built in gulp commands can be used */

var local = process.cwd().replace(/(\\)/g,'/'),
    fs = require('fs');

var stream = fs.createWriteStream(local+"/../../init.js");
stream.once('open', function(fd) {
  stream.write("require('konnekt');\n");
  stream.end();
});

if(!fs.existsSync(local+'/../../config')) fs.mkdirSync(local+'/../../config');

if(!fs.existsSync(local+'/../../config/config.js'))
{
  var config = fs.createWriteStream(local+"/../../config/config.js");
  config.once('open', function(fd) {
    config.write("Konnekt.config({\r\n\r\n});\n");
    config.end();
  });
}