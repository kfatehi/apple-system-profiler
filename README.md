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
}, (err, out) => {
  if ( err ) throw err;
  console.log(out);
});
```

see `test.js`
