const prisma = require('../config/db');
const { sendEmail } = require('../config/email');

const createContact = async ({ name, email, company, projectType, budget, message }) => {
  const contact = await prisma.contact.create({
    data: { name, email, company, projectType, budget, message },
  });

  // Send notification email
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Project Request from ${name}`,
    html: `
      <h2>New Contact Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Company:</b> ${company || 'N/A'}</p>
      <p><b>Project Type:</b> ${projectType}</p>
      <p><b>Budget:</b> ${budget}</p>
      <p><b>Message:</b> ${message}</p>
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