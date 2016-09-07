var exec = require('child_process').exec;
var plist = require('plist');

module.exports = function(opts, cb) {
  var dataTypes = [];
  if ( opts && Array.isArray(opts.dataTypes) ) {
    dataTypes = opts.dataTypes
  }
  exec('/usr/sbin/system_profiler -xml -detailLevel mini '+dataTypes.join(' '), function(err, stdout) {
    if (err) throw err;
    parse(stdout, (err, out) => {
      if ( err ) throw err;
      cb(null, out);
    })
  });
}

function parse(buf, cb) {
  var data = plist.parse(buf.toString());
  var out = data.reduce(function(acc, sec) {
    return acc.concat({
      name: sec._dataType,
      items: sec._items[0],
      properties: sec._properties
    });
  }, []);
  cb(null, out);
}
