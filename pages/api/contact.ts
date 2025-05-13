// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Types pour la gestion des erreurs et du succès
type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Vérifie que la méthode est bien POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  // Récupère les données du formulaire
  const { name, email, subject, message } = req.body;

  // Validation des données
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Tous les champs sont requis' 
    });
  }

  try {
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'madany.doumbia@epitech.eu', // Votre adresse email
      replyTo: email,
      subject: `[Contact Portfolio] ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nouveau message du formulaire de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    // Envoie l'email
    await transporter.sendMail(mailOptions);

    // Réponse de succès
    return res.status(200).json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès!' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' 
    });
  }
}