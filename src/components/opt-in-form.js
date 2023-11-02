import Link from 'next/link';
import { info } from '../../info';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next";
import { useState } from 'react';

export default function OptInForm() {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setSending(true)

    data.phone = '52' + data.phone.replace(/^\+?(52)?\s?0?1?|\s|\(|\)|-/g, '');

    fetch('https://hook.us1.make.com/yots59pvvj41v9owiy6nicka7drtvyq2', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((result) => result.json())
      .then(({id}) => {
        setCookie('leadId', id)
        router.push(`/survey?id=${id}`);
      })

  }

  return (
    <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input {...register(
        'fullName',
        {
          required: true,
        }
      )} placeholder="tu nombre"/>
      <input {...register(
        'email',
        {
          required: true,
        }
      )} placeholder="un email que si uses"/>
      <input {...register(
        'phone',
        {
          required: true,
        }
      )} placeholder="teléfono de WhatsApp"/>
      <input {...register(
        'company',
        {
          required: true,
        }
      )} placeholder="tu sitio web o instagram"/>

      <button disabled={sending} className="w-full">{!sending ? 'Continuar' : 'Ahi vamos'}</button>

      <p className="-ft-3 mt-4 text-center">Al dar clic aceptas nuestra&nbsp;
        <Link href={info.privacyNotice}>
          <span>política de privacidad</span>
        </Link>
      </p>
    </form>
  );
}