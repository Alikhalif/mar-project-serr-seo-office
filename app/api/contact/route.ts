import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client only if credentials exist
let supabase: any = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized');
} else {
  console.warn('Supabase credentials not set. Form submissions will be logged but not saved to database.');
}

// GET method for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Contact API is working!',
    timestamp: new Date().toISOString(),
    supabase: {
      configured: !!supabase,
      url: supabaseUrl ? '✅ Set' : '❌ Not set',
    },
    endpoints: {
      GET: 'Test endpoint availability',
      POST: 'Submit contact form data'
    }
  });
}

// POST method for form submissions
export async function POST(request: NextRequest) {
  console.log('=== CONTACT FORM SUBMISSION START ===');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Request body received:', JSON.stringify(body, null, 2));

    // 1. Basic validation (matching your database constraints)
    const errors = [];
    
    // Name validation (2-50 characters)
    if (!body.name || typeof body.name !== 'string') {
      errors.push('Le nom est requis');
    } else {
      const name = body.name.trim();
      if (name.length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
      }
      if (name.length > 50) {
        errors.push('Le nom ne peut pas dépasser 50 caractères');
      }
    }

    // Email validation (basic format + length)
    if (!body.email || typeof body.email !== 'string') {
      errors.push('L\'email est requis');
    } else {
      const email = body.email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Veuillez entrer une adresse email valide');
      }
      if (email.length > 100) {
        errors.push('L\'email ne peut pas dépasser 100 caractères');
      }
    }

    // Phone validation (6-20 characters, numbers and + only)
    if (!body.phone || typeof body.phone !== 'string') {
      errors.push('Le téléphone est requis');
    } else {
      const phone = body.phone.trim();
      // Remove all non-digit characters except + for validation
      const digitsOnly = phone.replace(/[^\d+]/g, '');
      if (digitsOnly.length < 6) {
        errors.push('Le téléphone doit contenir au moins 6 chiffres');
      }
      if (phone.length > 20) {
        errors.push('Le téléphone ne peut pas dépasser 20 caractères');
      }
      // Basic phone format validation
      const phoneRegex = /^[0-9+\s\-\(\)]{6,20}$/;
      if (!phoneRegex.test(phone)) {
        errors.push('Format de téléphone invalide. Utilisez des chiffres, +, espaces, tirets ou parenthèses');
      }
    }

    // Ville validation (2-50 characters)
    if (!body.ville || typeof body.ville !== 'string') {
      errors.push('La ville est requise');
    } else {
      const ville = body.ville.trim();
      if (ville.length < 2) {
        errors.push('La ville doit contenir au moins 2 caractères');
      }
      if (ville.length > 50) {
        errors.push('La ville ne peut pas dépasser 50 caractères');
      }
    }

    // Address validation (5-100 characters)
    if (!body.address || typeof body.address !== 'string') {
      errors.push('L\'adresse est requise');
    } else {
      const address = body.address.trim();
      if (address.length < 5) {
        errors.push('L\'adresse doit contenir au moins 5 caractères');
      }
      if (address.length > 100) {
        errors.push('L\'adresse ne peut pas dépasser 100 caractères');
      }
    }

    // Message validation (10-500 characters)
    if (!body.message || typeof body.message !== 'string') {
      errors.push('Le message est requis');
    } else {
      const message = body.message.trim();
      if (message.length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
      }
      if (message.length > 500) {
        errors.push('Le message ne peut pas dépasser 500 caractères');
      }
    }

    // reCAPTCHA validation (skip if no secret key for testing)
    if (process.env.RECAPTCHA_SECRET_KEY && !body.recaptchaToken) {
      errors.push('Veuillez valider le reCAPTCHA');
    }

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      return NextResponse.json(
        { 
          success: false, 
          error: errors[0],
          allErrors: errors,
          validation: 'frontend_validation_failed'
        },
        { status: 400 }
      );
    }

    // 2. Prepare cleaned data
    const cleanedData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      ville: body.ville.trim(),
      address: body.address.trim(),
      message: body.message.trim(),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    };

    console.log('Cleaned data for database:', cleanedData);

    // 3. Skip reCAPTCHA verification if no secret key (for testing)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      console.log('Verifying reCAPTCHA...');
      try {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`,
        });

        const recaptchaResult = await recaptchaResponse.json();
        console.log('reCAPTCHA result:', recaptchaResult);
        
        if (!recaptchaResult.success) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Validation reCAPTCHA échouée. Veuillez réessayer.',
              recaptchaResult,
              validation: 'recaptcha_failed'
            },
            { status: 400 }
          );
        }
      } catch (recaptchaError) {
        console.warn('reCAPTCHA verification error:', recaptchaError);
        // Continue even if reCAPTCHA fails in development
      }
    } else {
      console.warn('RECAPTCHA_SECRET_KEY not set, skipping reCAPTCHA verification');
    }

    // 4. Save to Supabase if available
    let dbResult = null;
    let dbError = null;
    
    if (supabase) {
      try {
        console.log('Attempting to save to Supabase...');
        
        // First, let's test if the table exists
        const { error: testError } = await supabase
          .from('contacts')
          .select('id')
          .limit(1);

        if (testError) {
          console.error('Table access error (table might not exist):', testError);
          dbError = { message: `Table error: ${testError.message}`, code: 'TABLE_ERROR' };
        } else {
          // Table exists, try to insert
          const { data, error: insertError } = await supabase
            .from('contacts')
            .insert([cleanedData])  // Note: array format
            .select();

          if (insertError) {
            console.error('Database insert error:', insertError);
            dbError = insertError;
            
            // Provide more specific error messages
            if (insertError.code === '23514') {
              // Check constraint violation
              if (insertError.message.includes('email')) {
                dbError = { ...insertError, userMessage: 'Format d\'email invalide' };
              } else if (insertError.message.includes('phone')) {
                dbError = { ...insertError, userMessage: 'Format de téléphone invalide' };
              }
            }
          } else {
            dbResult = data;
            console.log('Successfully saved to database:', data);
          }
        }
      } catch (dbException) {
        console.error('Database exception:', dbException);
        dbError = dbException;
      }
    } else {
      console.warn('Supabase client not initialized, skipping database save');
      dbError = { message: 'Database not configured', code: 'NO_DB_CONFIG' };
    }

    // 5. Handle database errors
    if (dbError) {
      console.error('Database operation failed:', dbError);
      
      // Still try to send email even if database failed
      const emailSent = await sendEmailNotification(cleanedData);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erreur lors de l\'enregistrement dans la base de données.',
          details: dbError.message || 'Database error',
          dbErrorCode: dbError.code,
          emailSent,
          validation: 'database_error'
        },
        { status: 500 }
      );
    }

    // 6. Send email notification (optional)
    const emailResult = await sendEmailNotification(cleanedData);

    console.log('=== CONTACT FORM SUBMISSION END - SUCCESS ===');
    
    return NextResponse.json({ 
      success: true,
      message: 'Message envoyé avec succès!',
      timestamp: new Date().toISOString(),
      savedToDatabase: !!dbResult,
      emailSent: emailResult.success,
      data: {
        id: dbResult?.[0]?.id,
        name: cleanedData.name,
        email: cleanedData.email,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('=== CONTACT FORM SUBMISSION ERROR ===', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Une erreur interne est survenue lors de l\'envoi du formulaire.',
        details: error.message,
        validation: 'server_error'
      },
      { status: 500 }
    );
  }
}

// Helper function to send email notifications
async function sendEmailNotification(formData: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping email notification');
    return { success: false, reason: 'no_api_key' };
  }

  try {
    console.log('Attempting to send email notification...');
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['khalifkh35@gmail.com'],
        reply_to: formData.email,
        subject: `📧 Nouveau message de ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              Nouveau message de contact
            </h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>👤 Nom:</strong> ${formData.name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
              <p><strong>📞 Téléphone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
              <p><strong>🏙️ Ville:</strong> ${formData.ville}</p>
              <p><strong>📍 Adresse:</strong> ${formData.address}</p>
              <p><strong>💬 Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 3px solid #dc2626;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="font-size: 12px; color: #64748b; text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
              <p>IP: ${formData.ip_address} | ${new Date().toLocaleString('fr-FR')}</p>
              <p>Groupe Officiel de Serrurerie - Contact Form</p>
            </div>
          </div>
        `,
      }),
    });

    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('Email sent successfully:', result.id);
      return { success: true, id: result.id };
    } else {
      const errorText = await emailResponse.text();
      console.warn('Email sending failed:', emailResponse.status, errorText);
      return { 
        success: false, 
        status: emailResponse.status,
        error: errorText 
      };
    }
  } catch (emailError) {
    console.warn('Email sending error:', emailError);
    return { 
      success: false, 
    };
  }
}