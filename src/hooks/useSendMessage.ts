import { ContactFormData } from '@/pages/HomePage/components/Contacts/components/ContactForm/ContactForm';
import { useMutation } from '@tanstack/react-query';

const sendToTelegram = async (formData: ContactFormData) => {
  const TOKEN = '7059915078:AAFpjqlyoLzHsutEtH7rRDsItInXnKx8cEw';
  const CHAT_ID = '517234637';
  const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const message = `Нове повідомлення з сайту:
    Ім'я: ${formData.name} ${formData.surname}
    Email: ${formData.email}
    Телефон: ${formData.tel}
    Послуги: ${formData.services.join(', ')}
    Методи зв'язку: ${formData.contactMethods.join(', ')}`;

  console.log('Відправка запиту в Telegram:', message);

  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });

  console.log('Отримано відповідь від Telegram:', response);

  if (!response.ok) {
    throw new Error('Не вдалося відправити повідомлення');
  }

  return response.json();
};

export const useSendMessage = () => {
  return useMutation<unknown, Error, ContactFormData>({
    mutationFn: (data) => {
      console.log('useSendMessage викликано з даними:', data);
      return sendToTelegram(data);
    },
  });
};
