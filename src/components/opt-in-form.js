import Link from 'next/link';
import { info } from '../../info';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber, emailRegExp } from '@/utils/formValidators';
import fbEvents from '@/services/fbEvents';
import fbEvent from '@/services/fbEvents';

export default function OptInForm() {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    setSending(true);
    data.phone = '52' + data.phone.replace(/^\+?((MX)?\s?(52)?)?\s?0?1?|\s|\(|\)|-/g, '');

    const fbParams = fbEvents('CompleteRegistration');

    const payload = {...data, fbParams};

    fetch('https://hook.us1.make.com/yots59pvvj41v9owiy6nicka7drtvyq2', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => result.json())
      .then(({id}) => {
        fbEvent(
          'CompleteRegistration',
          {email: data.email, phone: data.phone, externalID: id},
        );
        setCookie('lead', {...data, id});
        router.push(`/survey?id=${id}`);
      })
      .catch(() => {
        fbEvent(
          'CompleteRegistration',
          {email: data.email, phone: data.phone, externalID: ''},
        );
        setCookie('lead', {...data});
      });
  };

  return (
    <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register(
          'fullName',
          {
            required: true,
          },
        )}
        className={errors.fullName ? '!border-brand-2 mt-12' : 'mt-12'}
        placeholder="tu nombre"
      />
      <input
        {...register(
          'email',
          {
            required: true,
            pattern: {
              value: emailRegExp,
              message: 'Revisa tu correo',
            },
          },
        )}
        className={errors.email ? '!border-brand-2 mt-12' : 'mt-12'}
        placeholder="un email que si uses"
      />
      {errors.email && <span className="-ft-3 text-brand-2">Revisa tu email</span>}
      <input
        {...register(
          'phone',
          {required: true, maxLength: 10, minLength: 10},
        )}
        className={errors.phone ? '!border-brand-2 mt-12' : 'mt-12'}
        onKeyDown={restrictNumber}
        placeholder="teléfono de WhatsApp"
      />
      {errors.phone && <span className="-ft-3 text-brand-2">Solo 10 dígitos sin espacios</span>}
      <input {...register(
        'company',
        {
          required: true,
        },
      )} placeholder="nombre de tu empresa"/>

      <button disabled={sending} className="w-full">
        {sending && <span className="animate-spin mr-4">+</span>}
        {!sending ? 'Continuar' : 'Ahí vamos'}
      </button>

      <p className="-ft-3 mt-4 text-center">Al dar clic aceptas nuestra&nbsp;
        <Link href={info.privacyNotice}>política de privacidad</Link>
      </p>
    </form>
  );
}