const {
  systemProfiler: asp,
  listDataTypes
} = require('./index.js');

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

(async () => {
  try {
    const out = await asp({
      dataTypes: [
        'SPFontsDataType'
      ]
    });
    console.log(out);
  } catch (err) {
    console.log('Error', err);
  }
  try {
    const json = await listDataTypes();
    console.log('json', json);
  } catch (err) {
    console.log('Err', err.stdout);
  }

  try {
    const out = await asp({
      normalize: false,
      detailLevel: 'full', // mini|basic|full
      dataTypes: [
        'SPFontsDataType'
      ]
    });
    console.log(out);
  } catch (err) {
    console.log('Error', err);
  }
})();
