// netlify/functions/submit-waitlist.js

const https = require("https");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email;
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid request body" }),
    };
  }

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Email is required" }),
    };
  }

  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    console.error("FORMSPREE_FORM_ID environment variable is not set");
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Server configuration error",
      }),
    };
  }

  const payload = JSON.stringify({ email });

  const result = await new Promise((resolve, reject) => {
    const options = {
      hostname: "formspree.io",
      path: `/f/${formId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // tells Formspree to return JSON not HTML
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({ ok: res.statusCode < 400, body: JSON.parse(data) });
        } catch {
          reject(
            new Error(`Formspree returned non-JSON: ${data.slice(0, 100)}`),
          );
        }
      });
    });

    req.on("error", reject);
    req.write(payload);
    req.end();
  });

  return {
    statusCode: result.ok ? 200 : 400,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: result.ok,
      message: result.ok ? "Successfully joined waitlist" : "Submission failed",
    }),
  };
};
