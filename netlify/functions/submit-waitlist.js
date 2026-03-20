// netlify/functions/submit-waitlist.js
//
// This function runs on Netlify's servers — never in the browser.
// The Web3Forms key is read from the WEB3FORMS_KEY environment variable,
// which you set in the Netlify dashboard under Site configuration →
// Environment variables. It is never sent to the browser.

exports.handler = async function (event) {

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse the email from the browser's request body
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

  // Key lives here as an env variable — not in any file committed to GitHub
  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    console.error('WEB3FORMS_KEY environment variable is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Server configuration error' })
    };
  }

  // Forward to Web3Forms with the key added server-side
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: 'New Triim AI Hub Waitlist Signup',
      email: email
    })
  });

  const result = await response.json();

  return {
    statusCode: response.ok ? 200 : 400,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  };
};
