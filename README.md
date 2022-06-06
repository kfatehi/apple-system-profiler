# apple-system-profiler

wrapper around apple's `system_profiler` that parses the output

## usage

```javascript
const asp = require('./index.js')

// Grab graphics, hardware, and memory info
// and parse them out as a JavaScript object

asp({
  dataTypes: [
    'SPDisplaysDataType',
    'SPHardwareDataType',
    'SPMemoryDataType'
  ]
  /*
  Other options (with defaults):
    detailLevel: 'mini', // mini|basic|full
    cwd: undefined,
    maxBuffer: Infinity,
    normalize: true // Set to `false` to get raw, untransformed JSON data
   */
}, (err, out) => {
  if ( err ) throw err;
  console.log(out);
});
```

see `test.js`
