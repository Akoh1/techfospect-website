const https = require('https');

exports.handler = async function (event) {

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email;
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Invalid request body' })
    };
  }

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Email is required' })
    };
  }

  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    console.error('WEB3FORMS_KEY environment variable is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Server configuration error' })
    };
  }

  const payload = JSON.stringify({
    access_key: accessKey,
    subject: 'New Triim AI Hub Waitlist Signup',
    email: email
  });

  // Use Node's built-in https module — no fetch, works on any Node version
  const result = await new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.web3forms.com',
      path: '/submit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ ok: res.statusCode < 400, body: JSON.parse(data) });
        } catch {
          reject(new Error(`Web3Forms returned non-JSON response: ${data.slice(0, 100)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });

  return {
    statusCode: result.ok ? 200 : 400,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.body)
  };
};
