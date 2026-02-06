package com.example.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarTokenPolvo(String para, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("noreply@alsecurity.com");
        helper.setTo(para);
        helper.setSubject("Seu Código de Segurança 🐙");

        String htmlBody = """
            <div style="background-color: #f0f4f8; padding: 50px 20px; font-family: 'Segoe UI', Tahoma, sans-serif;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    
                    <div style="background-color: #10b981; padding: 20px; text-align: center;">
                        <span style="color: #ffffff; font-weight: 800; letter-spacing: 3px; font-size: 14px; text-transform: uppercase;">AL Security System</span>
                    </div>

                    <div style="padding: 40px; text-align: center;">
                        
                        <div style="width: 160px; height: 160px; margin: 0 auto; position: relative;">
                            
                            <div style="position: absolute; width: 80px; height: 15px; background: rgba(0,0,0,0.1); border-radius: 50%%; bottom: 5px; left: 40px;"></div>

                            <div style="width: 110px; height: 100px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 55px 55px 45px 45px; margin: 0 auto; position: relative; z-index: 2; box-shadow: inset -5px -5px 15px rgba(0,0,0,0.1);">
                                
                                <div style="position: absolute; width: 28px; height: 28px; background: white; border-radius: 50%%; top: 38px; left: 18px; display: flex; align-items: center; justify-content: center;">
                                    <div style="width: 10px; height: 10px; background: #1f2937; border-radius: 50%%;"></div>
                                </div>
                                <div style="position: absolute; width: 28px; height: 28px; background: white; border-radius: 50%%; top: 38px; right: 18px; display: flex; align-items: center; justify-content: center;">
                                    <div style="width: 10px; height: 10px; background: #1f2937; border-radius: 50%%;"></div>
                                </div>

                                <div style="position: absolute; width: 24px; height: 12px; border-bottom: 3px solid #064e3b; border-radius: 0 0 12px 12px; bottom: 18px; left: 43px;"></div>
                            </div>

                            <div style="width: 130px; margin: -25px auto 0 auto; position: relative; z-index: 1;">
                                <div style="display: inline-block; width: 20px; height: 45px; background: #059669; border-radius: 15px; transform: rotate(15deg); margin-right: -5px;"></div>
                                <div style="display: inline-block; width: 20px; height: 55px; background: #10b981; border-radius: 15px; margin-top: 10px;"></div>
                                <div style="display: inline-block; width: 20px; height: 55px; background: #10b981; border-radius: 15px; margin-top: 10px;"></div>
                                <div style="display: inline-block; width: 20px; height: 45px; background: #059669; border-radius: 15px; transform: rotate(-15deg); margin-left: -5px;"></div>
                            </div>
                        </div>

                        <h2 style="color: #1f2937; font-size: 22px; margin-top: 20px; margin-bottom: 10px;">Verificação de Acesso</h2>
                        <p style="color: #64748b; font-size: 15px; line-height: 1.5;">Detectamos uma tentativa de login com o seu CNPJ. Utilize o código de segurança abaixo para prosseguir:</p>

                        <div style="margin: 35px 0; padding: 25px; background-color: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px;">
                            <span style="display: block; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Código Único</span>
                            <span style="font-size: 42px; font-weight: 800; color: #1e293b; letter-spacing: 8px;">
                                %s
                            </span>
                        </div>

                        <div style="background-color: #fff9eb; border-left: 4px solid #f59e0b; padding: 15px; text-align: left; margin-bottom: 20px;">
                            <p style="color: #92400e; font-size: 13px; margin: 0;"><strong>Atenção:</strong> Este código expira em 10 minutos e só pode ser usado uma única vez.</p>
                        </div>

                        <p style="color: #94a3b8; font-size: 12px;">Se você não solicitou este acesso, por favor ignore este e-mail ou entre em contato com o suporte.</p>
                    </div>

                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="color: #94a3b8; font-size: 11px; margin: 0;">&copy; 2026 AL Security - Proteção de Dados e Monitoramento</p>
                    </div>
                </div>
            </div>
        """.formatted(token);

        helper.setText(htmlBody, true);
        mailSender.send(message);
    }
}