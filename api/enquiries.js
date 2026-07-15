module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, message: 'Enquiries API is running' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { fullName, phone, email, college, occupation, message, privacyPolicy } = req.body || {};

  if (!fullName || !phone || !email || !occupation) {
    return res.status(400).json({ success: false, message: 'Please fill the required fields before submitting.' });
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ success: false, message: 'Phone number must be 10 digits.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  return res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully',
    data: {
      fullName,
      phone,
      email,
      college: college || '',
      occupation,
      message: message || '',
      privacyPolicy: Boolean(privacyPolicy),
    },
  });
};
