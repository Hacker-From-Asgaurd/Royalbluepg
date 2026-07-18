const Enquiry = require('../models/Enquiry');
const Content = require('../models/Content');

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

/** @desc Get all enquiries | @route GET /api/enquiries */
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Submit enquiry (public) | @route POST /api/enquiries */
exports.submitEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.validatedBody || req.body);

    const recipientEmail = process.env.ADMIN_EMAIL;

    // Await email so Vercel doesn't shut down before it sends
    try {
      const nodemailer = require('nodemailer');
      const getTransporter = () => nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      // Email to owner
      await getTransporter().sendMail({
        from: `"Royal Blue PG" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject: `New Enquiry from ${enquiry.fullName}`,
        html: `
          <p>Hello,</p>
          <p>You have received a new enquiry through the Royal Blue PG website. The details are as follows:</p>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(enquiry.fullName)}</li>
            <li><strong>Email:</strong> ${escapeHtml(enquiry.email)}</li>
            <li><strong>Phone Number:</strong> ${escapeHtml(enquiry.phone)}</li>
            <li><strong>College Name:</strong> ${escapeHtml(enquiry.college || 'N/A')}</li>
            <li><strong>Additional Message:</strong> ${escapeHtml(enquiry.message || 'N/A')}</li>
          </ul>
          <p>Please review the enquiry and contact the customer at your earliest convenience.</p>
          <p>Best Regards,<br/>Royal Blue PG Website<br/><em>Automated Enquiry Notification.</em></p>
        `,
      });

      // Auto-reply to enquirer
      await getTransporter().sendMail({
        from: `"Royal Blue PG" <${process.env.SMTP_USER}>`,
        to: enquiry.email,
        subject: `Thank you for your enquiry - Royal Blue PG`,
        html: `
          <p>Dear ${escapeHtml(enquiry.fullName)},</p>
          <p>Thank you for reaching out! 🎉</p>
          <p>We've received your enquiry successfully. We will get back to you as soon as possible.</p>
          <p>If your enquiry is urgent, please feel free to contact us directly using the details provided on our website.</p>
          <p>We appreciate your interest and look forward to connecting with you!</p>
          <br/>
          <p>Best Regards,<br/><strong>Royal Blue PG Team</strong><br/>📞 +91 99238 05090</p>
        `,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Enquiry submitted successfully', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Update enquiry status | @route PUT /api/enquiries/:id */
exports.updateEnquiry = async (req, res) => {
  try {
    const { status } = req.validatedBody || req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Export enquiries to Excel | @route GET /api/enquiries/export */
exports.exportEnquiries = async (req, res) => {
  try {
    const ExcelJS = require('exceljs');
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Enquiries');

    sheet.columns = [
      { header: 'Name', key: 'fullName', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'College/Company', key: 'college', width: 20 },
      { header: 'Occupation', key: 'occupation', width: 15 },
      { header: 'Room Preference', key: 'roomPreference', width: 15 },
      { header: 'Move-in Date', key: 'moveInDate', width: 15 },
      { header: 'Duration', key: 'duration', width: 12 },
      { header: 'Message', key: 'message', width: 30 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // Style header row
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3F51B5' } };

    enquiries.forEach((enq) => {
      sheet.addRow({
        ...enq.toObject(),
        moveInDate: enq.moveInDate ? new Date(enq.moveInDate).toLocaleDateString() : 'N/A',
        createdAt: new Date(enq.createdAt).toLocaleString(),
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=enquiries.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
