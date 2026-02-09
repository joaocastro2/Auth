package com.example.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetentMail;

    public void enviarTokenPolvo(String para, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(remetentMail);
        helper.setTo(para);
        helper.setSubject("MEU TOKEN AL SEGURANÇA");

        String htmlBody = """
            <div style="background-color: #F1F5F9; padding: 40px 10px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);">
                    <div style="background-color: #0F172A; padding: 30px; text-align: center;">
                        <div style="display: inline-block; padding: 8px 15px; border: 1px solid #334155; border-radius: 12px;">
                            <span style="color: #FFFFFF; font-weight: 900; letter-spacing: 2px; font-size: 16px; text-transform: uppercase;">
                                AL <span style="color: #10B981; font-weight: 400;">SEGURANÇA</span>
                            </span>
                        </div>
                    </div>
                    <div style="padding: 40px 30px; text-align: center;">
                        <div style="margin-bottom: 30px;">
                            <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                                <path d="M50,100 C50,40 150,40 150,100 C150,135 130,155 100,155 C70,155 50,135 50,100" fill="none" stroke="#10B981" stroke-width="4" />
                                <circle cx="80" cy="95" r="5" fill="#10B981" />
                                <circle cx="120" cy="95" r="5" fill="#10B981" />
                                <path d="M70,150 L60,180 M90,155 L90,190 M110,155 L110,190 M130,150 L140,180" stroke="#10B981" stroke-width="4" stroke-linecap="round" />
                            </svg>
                        </div>
                        <h2 style="color: #0F172A; font-size: 24px; font-weight: 800; margin: 0; tracking: -0.5px;">Autenticação de Acesso</h2>
                        <p style="color: #64748B; font-size: 14px; line-height: 1.6; margin-top: 12px;">
                            Olá, recebemos uma solicitação de entrada no painel <strong>AL Segurança</strong> para o seu CNPJ institucional.
                        </p>
                        <div style="margin: 40px 0; padding: 30px; background-color: #F8FAFC; border-radius: 24px; border: 2px dashed #E2E8F0;">
                            <span style="display: block; font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 15px; font-weight: 700;">Seu Código Token</span>
                            <span style="font-size: 48px; font-weight: 900; color: #0F172A; letter-spacing: 12px; font-family: monospace;">
                                %s
                            </span>
                        </div>
                        <div style="background-color: #F1F5F9; border-radius: 16px; padding: 15px; text-align: left; margin-bottom: 30px;">
                            <table role="presentation" width="100%%">
                                <tr>
                                    <td style="vertical-align: top; width: 30px;">
                                        <span style="font-size: 18px;">🛡️</span>
                                    </td>
                                    <td>
                                        <p style="color: #475569; font-size: 12px; margin: 0; line-height: 1.4;">
                                            <strong>Dica de Segurança:</strong> Nunca compartilhe este código. Nossa equipe nunca solicitará seu token por telefone ou redes sociais.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p style="color: #94A3B8; font-size: 11px; line-height: 1.5;">
                            Se você não reconhece esta atividade, sua conta pode estar sendo testada. Nenhuma ação adicional é necessária, pois o acesso requer este código físico.
                        </p>
                    </div>
                    <div style="background-color: #F8FAFC; padding: 25px; text-align: center; border-top: 1px solid #F1F5F9;">
                        <p style="color: #94A3B8; font-size: 10px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                            &copy; 2026 AL SEGURANÇA &bull; MONITORAMENTO INTELIGENTE
                        </p>
                    </div>
                </div>
            </div>
        """.formatted(token);

        helper.setText(htmlBody, true);
        mailSender.send(message);
    }
}