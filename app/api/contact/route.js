import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Add debug logging for environment variables
console.log('Loading environment variables...');
console.log('Email address:', process.env.EMAIL_ADDRESS);
console.log('Password exists:', !!process.env.GMAIL_PASSKEY);

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Transporter verification failed:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  console.log('Attempting to send email with payload:', {
    name: payload.name,
    email: payload.email,
    messageLength: payload.message?.length
  });

  const { name, email, message: userMessage } = payload;
  
  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_ADDRESS}>`,
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  console.log('Mail options configured:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject
  });
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Detailed error while sending email:', error);
    console.error('Error stack:', error.stack);
    return false;
  }
}

export async function POST(request) {
  console.log('Received POST request to send email');
  
  try {
    const payload = await request.json();
    console.log('Parsed request payload:', {
      name: payload.name,
      email: payload.email,
      messageLength: payload.message?.length
    });

    const message = `New message from ${payload.name}\n\nEmail: ${payload.email}\n\nMessage:\n\n${payload.message}\n\n`;

    // Send email
    console.log('Calling sendEmail function...');
    const emailSuccess = await sendEmail(payload, message);

    if (emailSuccess) {
      console.log('Email sent successfully');
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully!',
      }, { status: 200 });
    }

    console.log('Failed to send email');
    return NextResponse.json({
      success: false,
      message: 'Failed to send email.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
}