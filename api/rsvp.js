export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { name, attending, intolerances, message } = req.body;
    
    // Your Telegram Bot Token and Chat ID
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Validate environment variables
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing environment variables');
      return res.status(500).json({ 
        message: 'Server configuration error'
      });
    }
  
    // Format the message
    const telegramMessage = `
  🎉 *Nové potvrzení účasti na svatbě*
  
  👤 *Jméno:* ${name}
  ✅ *Účast:* ${attending === 'yes' ? 'Ano ✨' : 'Ne 😢'}
  🍽️ *Dieta:* ${intolerances || 'Žádná'}
  💌 *Zpráva:* ${message || 'Žádná zpráva'}
    `.trim();
  
    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      console.log('Sending to Telegram, URL length:', telegramUrl.length);
      
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API error:', errorData);
        throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
      }
  
      return res.status(200).json({ message: 'RSVP received successfully' });
    } catch (error) {
      console.error('Error sending RSVP:', error.message);
      return res.status(500).json({ 
        message: 'Failed to send RSVP',
        error: error.message 
      });
    }
  }