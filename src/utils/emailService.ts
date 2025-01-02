import emailConfig from '../config/email';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  try {
    const response = await fetch(emailConfig.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        From: {
          Address: emailConfig.fromAddress,
          Name: emailConfig.fromName
        },
        To: [{
          Address: data.to,
          Name: ''
        }],
        Subject: data.subject,
        Html: data.html
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Email server error: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Email error:', error.message);
    }
    throw error;
  }
}