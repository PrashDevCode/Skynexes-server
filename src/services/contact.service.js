const prisma = require('../config/db');
const { sendEmail } = require('../config/email');

const createContact = async ({ name, email, company, projectType, budget, message }) => {
  // Save to database
  const contact = await prisma.contact.create({
    data: { name, email, company, projectType, budget, message },
  });

  // 1. Notify Skynexes team
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Project Request from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #020617; color: white; padding: 30px; border-radius: 12px;">
        <h2 style="color: #38BDF8; margin-bottom: 20px;">🚀 New Project Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; width: 140px;">Name</td>
            <td style="padding: 10px 0; color: white;"><b>${name}</b></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8;">Email</td>
            <td style="padding: 10px 0; color: white;"><b>${email}</b></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8;">Company</td>
            <td style="padding: 10px 0; color: white;"><b>${company || 'N/A'}</b></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8;">Project Type</td>
            <td style="padding: 10px 0; color: white;"><b>${projectType}</b></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8;">Budget</td>
            <td style="padding: 10px 0; color: white;"><b>${budget}</b></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: white;"><b>${message}</b></td>
          </tr>
        </table>
        <hr style="border-color: #1e293b; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">This request was submitted via skynexes.com</p>
      </div>
    `,
  });

  // 2. Confirmation email to user
  await sendEmail({
    to: email,
    subject: `We received your request, ${name}! 🚀`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #020617; color: white; padding: 30px; border-radius: 12px;">
        <h2 style="color: #38BDF8;">Hey ${name}, we got your request! 👋</h2>
        <p style="color: #94a3b8; line-height: 1.6;">
          Thank you for reaching out to <b style="color: white;">Skynexes</b>. 
          We've received your project request and our team will get back to you 
          within <b style="color: #38BDF8;">24 hours</b>.
        </p>
        <hr style="border-color: #1e293b; margin: 20px 0;" />
        <h3 style="color: white; margin-bottom: 15px;">Your Request Summary:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; width: 140px;">Project Type</td>
            <td style="padding: 8px 0; color: white;"><b>${projectType}</b></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Budget</td>
            <td style="padding: 8px 0; color: white;"><b>${budget}</b></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; color: white;"><b>${message}</b></td>
          </tr>
        </table>
        <hr style="border-color: #1e293b; margin: 20px 0;" />
        <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="color: #94a3b8; margin: 0 0 10px 0;">While you wait, feel free to explore:</p>
          <a href="https://skynexes.com/services" style="color: #38BDF8; display: block; margin: 5px 0;">→ Our Services</a>
          <a href="https://skynexes.com/how-we-work" style="color: #38BDF8; display: block; margin: 5px 0;">→ How We Work</a>
        </div>
        <p style="color: #94a3b8; margin-top: 20px;">
          Best regards,<br/>
          <b style="color: white;">Skynexes Team</b><br/>
          <span style="color: #38BDF8;">hello@skynexes.com</span>
        </p>
      </div>
    `,
  });

  return contact;
};

const getContacts = async () => {
  return await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

module.exports = { createContact, getContacts };