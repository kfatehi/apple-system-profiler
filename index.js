const {exec} = require('child_process');
const plist = require('plist');

module.exports = function(opts, cb) {
  opts = opts || {};
  const dataTypes = opts && Array.isArray(opts.dataTypes)
    ? opts.dataTypes
    : [];

  return new Promise((resolve, reject) => {
    exec('/usr/sbin/system_profiler -xml -detailLevel mini ' + dataTypes.join(' '), {
      cwd: opts.cwd,
      maxBuffer: opts.maxBuffer || Infinity
    }, function(err, stdout) {
      if (err) {
        if (cb) cb(err);
        err.stdout = stdout;
        reject(err);
        return;
      }
      parse(stdout, (err, out) => {
        if ( err ) {
          if (cb) cb(err, out);
          err.stdout = stdout;
          err.out = out;
          reject(err);
          return;
        }
        if (cb) {
          cb(null, out);
        }
        resolve(out);
      })
    });
  });
}

function parse(buf, cb) {
  const data = plist.parse(buf.toString());
  const out = data.reduce(function(acc, sec) {
    return acc.concat({
      name: sec._dataType,
      items: sec._items[0],
      properties: sec._properties
    });
  }, []);
  cb(null, out);
}
