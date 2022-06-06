const {exec} = require('child_process');
const plist = require('plist');

exports.systemProfiler = function(opts, cb) {
  opts = opts || {};
  const dataTypes = opts && Array.isArray(opts.dataTypes)
    ? opts.dataTypes
    : [];

  const detailLevel = ['mini', 'basic', 'full'].includes(opts.detailLevel)
    ? opts.detailLevel
    : 'mini';

  return new Promise((resolve, reject) => {
    exec(`/usr/sbin/system_profiler -xml -detailLevel ${detailLevel} ${
      dataTypes.join(' ')
    } ${opts.timeout ? ` -timeout ${opts.timeout}` : ''}`, {
      cwd: opts.cwd,
      maxBuffer: opts.maxBuffer || Infinity
    }, function(err, stdout) {
      if (err) {
        if (cb) cb(err);
        err.stdout = stdout;
        reject(err);
        return;
      }
      parse(stdout, opts.normalize !== false, (err, out) => {
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
};

function parse(buf, normalize, cb) {
  const data = plist.parse(buf.toString());
  const out = normalize
    ? data.reduce(function(acc, sec) {
      return acc.concat({
        name: sec._dataType,
        items: sec._items[0],
        properties: sec._properties
      });
    }, [])
    : data;
  cb(null, out);
}

exports.listDataTypes = function (opts, cb) {
  opts = opts || {};
  return new Promise((resolve, reject) => {
    exec(`/usr/sbin/system_profiler -listDataTypes`, {
      cwd: opts.cwd,
      maxBuffer: opts.maxBuffer || Infinity
    }, function(err, stdout) {
      if (err) {
        cb(err);
        err.stdout = stdout;
        reject(err);
        return;
      }
      const json = stdout.trim().split('\n').slice(1);
      if (cb) {
        cb(null, json);
      }
      resolve(json);
    });
  });
};
