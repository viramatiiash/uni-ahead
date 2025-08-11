import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@components/Input/Input';
import { Checkbox } from '@components/Checkbox/Checkbox';
import styles from './contact-form.module.scss';
import { FormWrapper } from '@/components/Form/FormWrapper';
import {
  EnvelopeIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from '@assets/icons';
import { Button } from '@/components/Button/Button';
import classNames from 'classnames';
import { useSendMessage } from '@/hooks/useSendMessage';
import {
  contactFormSchema,
  ContactFormData,
} from '@/schemas/contactFormSchema';
import React, { Suspense, useState } from 'react';
import { tickVector } from '@/utils/textVectors';
const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      tel: '',
      services: [],
      contactMethods: [],
    },
  });

  const { mutate } = useSendMessage();

  const onSubmit = (data: ContactFormData) => {
    console.log('Form Data:', data);
    mutate(data);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <FormWrapper>
        <div className={styles.tickIconContainer}>
          <Suspense fallback={null}>
            <TextVector
              viewBox={tickVector.viewBox}
              d={tickVector.d}
              stroke={tickVector.stroke}
              strokeWidth={tickVector.strokeWidth}
              customClass={styles.tickVector}
            />
          </Suspense>
        </div>

        <p className={styles.title}>
          Твоя форма успішно відправлена! Скоро ми зв'яжемося з тобою!
        </p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <h4 className={styles.title}>
        Вкажи свої дані і ми скоро зв’яжемося з тобою!
      </h4>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <div className={styles.field}>
            <Input
              belongsTo='sign-up'
              name='name'
              label="Ім'я"
              control={control}
              placeholder='Іван'
              error={errors.name?.message}
            />
          </div>

          <div className={styles.field}>
            <Input
              belongsTo='sign-up'
              name='surname'
              label='Прізвище'
              control={control}
              placeholder='Петренко'
              error={errors.surname?.message}
            />
          </div>
        </div>

        <div className={styles.field}>
          <Input
            belongsTo='sign-up'
            name='email'
            label='Імейл'
            control={control}
            placeholder='ivan.petrenko@gmail.com'
            type='email'
            error={errors.email?.message}
          />
        </div>

        <div className={classNames(styles.field, styles.fieldLast)}>
          <Input
            belongsTo='sign-up'
            name='tel'
            label='Телефон'
            control={control}
            placeholder='+380991234567'
            type='tel'
            error={errors.tel?.message}
          />
        </div>

        <div className={styles.checkboxField}>
          <label className={styles.label}>Послуга, що тебе зацікавила</label>

          <div className={styles.checkboxGrid}>
            <Checkbox
              name='services'
              control={control}
              value='UniAhead'
              label='UniAhead'
            />

            <Checkbox
              name='services'
              control={control}
              value='MedAhead'
              label='MedAhead'
            />
          </div>

          {errors.services && (
            <p className={styles.error}>{errors.services?.message}</p>
          )}
        </div>

        <div className={styles.checkboxField}>
          <label className={styles.label}>Як нам зв'язатися з тобою?</label>

          <div className={styles.checkboxGrid}>
            <Checkbox
              name='contactMethods'
              control={control}
              value='Email'
              label='Email'
              icon={<EnvelopeIcon />}
            />

            <Checkbox
              name='contactMethods'
              control={control}
              value='Telegram'
              label='Telegram'
              icon={<TelegramIcon />}
            />

            <Checkbox
              name='contactMethods'
              control={control}
              value='WhatsApp'
              label='WhatsApp'
              icon={<WhatsAppIcon />}
            />

            <Checkbox
              name='contactMethods'
              control={control}
              value='Передзвонити'
              label='Передзвонити'
              icon={<PhoneIcon />}
            />
          </div>
          
          {errors.contactMethods && (
            <p className={styles.error}>{errors.contactMethods?.message}</p>
          )}
        </div>

        <Button className={styles.button} type='submit'>
          Відправити
        </Button>
      </form>
    </FormWrapper>
  );
};
