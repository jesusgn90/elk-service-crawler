const Tail = require('tail').Tail;
const axios = require('axios');
const { version } = require('./package.json');
const FILE = `${__dirname}/output`;
const DEBUG = false;
if (DEBUG) {
  console.log(`
------------------------------------------------------
STARTED SERVICE-CRAWLER ${version}                   
------------------------------------------------------
`);
}
const tail = new Tail(FILE);

tail.on('line', async line => {
  if (line.length) {
    //Discovered open port 9200/tcp on 108.187.254.55
    const result = line.split(' ');
    const [a, b, c, port, d, ip] = result;
    const [parsedPort, protocol] = port.split('/');
    try {
      const httpURL = `http://${ip}:${parsedPort}`;
      DEBUG && console.log(`Trying ${httpURL}...`);
      const result = await axios.get(httpURL);
      const { data } = result;
      const { cluster_name, name } = data;
      if (cluster_name && name) {
        if (DEBUG) {
          console.log(
            `
------------------------------------------------------
Elasticsearch server found! 
Cluster name: ${cluster_name}
Node name   : ${name}
Address     : ${ip}:${port}
------------------------------------------------------
`
          );
        } else {
          const obj = {
            cluster_name,
            name,
            httpURL,
            ip,
            port
          };
          // Default one-line JSON output
          console.log(JSON.stringify(obj));
        }
      }
    } catch (error) {
      if (DEBUG) {
        console.log(`Error found: ${error.message || error}, continue...`);
      }
    }
  } else {
    if (DEBUG) {
      console.log('Empty line, continue...');
    }
  }
});
