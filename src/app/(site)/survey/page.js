'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Checkbox, Radio } from '@/components/formAtoms';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';
import { restrictNumber } from '@/utils/formValidators';
import fbEvent from '@/services/fbEvents';
import { info } from '../../../../info';
import LeadQualifier from '@/utils/leadQualifier';



export const formSteps = [
  {
    name: 'firstName',
    title: 'Ok, prometo hacer esto lo más sencillo posible.',
    description: 'Empecemos por tu nombre, el que más te guste. Para irnos tuteando desde ahorita.',
    type: 'text',
    inputOptions: { required: 'Compártenos tu nombre' },
    placeholder: 'Tu nombre',
  },
  {
    name: 'businessVertical',
    title: '¿En qué industria opera tu empresa?',
    description: 'Selecciona una.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'realEstate', label: 'Real Estate / Construcción' },
      { value: 'professionalServices', label: 'Servicios Profesionales' },
      { value: 'medical', label: 'Servicios Médicos / Salud' },
      { value: 'finance', label: 'Finanzas / Inversiones' },
      { value: 'industrial', label: 'Industrial / Manufactura / B2B' },
      { value: 'eCommerce', label: 'e-Commerce' },
      { value: 'education', label: 'Educación / Cursos' },
      { value: 'other', label: 'Otro' },
    ],
    cols: 2,
  },
  {
    name: 'productType',
    title: '¿Qué describe mejor lo que vendes?',
    description: 'Selecciona una.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'product', label: 'Producto' },
      { value: 'service', label: 'Servicio' },
    ],
    cols: 2,
  },
  {
    name: 'about',
    title: '¿Qué vendes?',
    description: 'Descríbeme brevemente qué producto o servicio vendes y quién es tu cliente típico.',
    type: 'textarea',
    inputOptions: { required: 'Por fa, cuéntanos un poco' },
    placeholder:
      'Ej. Somos una constructora que desarrolla proyectos residenciales en Guadalajara. Nuestros clientes son familias de nivel medio-alto buscando casa propia.',
    cols: 4,
  },
  {
    name: 'acquisition',
    title: '¿Cómo consigues clientes hoy?',
    description: 'Marca todos los que apliquen.',
    type: 'checkbox',
    inputOptions: { required: 'Selecciona al menos una opción' },
    options: [
      { value: 'referrals', label: 'Referidos / recomendaciones' },
      { value: 'organic', label: 'Redes sociales orgánicas' },
      { value: 'paid', label: 'Publicidad pagada (Meta / Google)' },
      { value: 'outbound', label: 'Prospección en frío (llamadas, LinkedIn, email)' },
      { value: 'events', label: 'Eventos o networking' },
      { value: 'seo', label: 'SEO / tráfico orgánico' },
      { value: 'none', label: 'No tengo un proceso definido' },
    ],
    cols: 2,
  },
  {
    name: 'currentSales',
    title: '¿Cuánto factura tu empresa al mes, aproximadamente?',
    description: 'Esto nos ayuda a medir el potencial de escalabilidad.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: '<100k', label: 'Menos de $100,000 MXN' },
      { value: '100k-300k', label: '$100,000 a $300,000 MXN' },
      { value: '300k-600k', label: '$300,000 a $600,000 MXN' },
      { value: '600k-1.5m', label: '$600,000 a $1,500,000 MXN' },
      { value: '1.5m+', label: 'Más de $1,500,000 MXN' },
    ],
    cols: 1,
  },
  {
    name: 'averageTicket',
    title: '¿Cuál es el valor promedio de cada cliente o venta que cierras?',
    description: 'Nos ayuda a calcular el retorno potencial de tener un sistema de cierre.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: '<5k', label: 'Menos de $5,000 MXN' },
      { value: '5k-15k', label: '$5,000 a $15,000 MXN' },
      { value: '15k-50k', label: '$15,000 a $50,000 MXN' },
      { value: '50k-150k', label: '$50,000 a $150,000 MXN' },
      { value: '150k+', label: 'Más de $150,000 MXN' },
    ],
    cols: 1,
  },
  {
    name: 'ltv',
    title: '¿Con qué frecuencia te vuelve a comprar un cliente en un año?',
    description: 'Nos ayuda a estimar el valor real de cada cliente que traes.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: '1x', label: 'No hay recompra, es venta única' },
      { value: '2x', label: '1 vez más al año' },
      { value: '3x', label: '2 a 3 veces al año' },
      { value: '4x+', label: '4 o más veces al año' },
      { value: 'recurring', label: 'Es recurrente (mensualidad / suscripción)' },
    ],
    cols: 1,
  },
  {
    name: 'salesTeam',
    title: '¿De qué tamaño es tu equipo de ventas hoy?',
    description: 'Sin exagerar ni modestia.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'solo', label: 'Solo yo me encargo de vender' },
      { value: '1', label: '1 vendedor además de mí' },
      { value: '2-4', label: '2 a 4 vendedores' },
      { value: '5+', label: '5 o más vendedores' },
      { value: 'noProcess', label: 'Tenemos equipo pero sin proceso definido' },
    ],
    cols: 1,
  },
  {
    name: 'bottleneck',
    title: '¿Cuál es tu mayor problema comercial hoy?',
    description: 'Sé honesto. Aquí nadie te juzga.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'noLeads', label: 'No llegan suficientes prospectos' },
      { value: 'noClose', label: 'Llegan prospectos pero no cierran' },
      { value: 'noConsistency', label: 'Cierro ventas pero no tengo consistencia mes a mes' },
      { value: 'noScale', label: 'Tengo clientes pero no sé cómo escalar sin perder el control' },
      { value: 'unknown', label: 'No sé exactamente dónde está el problema' },
    ],
    cols: 1,
  },
  {
    name: 'immediacy',
    title: 'Si tu empresa resulta calificada, ¿cuándo tienes pensado arrancar?',
    description: 'Para irnos programando.',
    type: 'radio',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'noDate', label: 'Lo estoy evaluando, sin fecha clara' },
      { value: '3months', label: 'En los próximos 3 meses' },
      { value: '1month', label: 'En el próximo mes' },
      { value: 'instantly', label: 'De inmediato' },
    ],
    cols: 1,
  },
];

export default function Survey() {
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
    getValues,
    watch,
  } = methods;
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('id');
    const lead = getCookie('lead');

    if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
      if (!id) {
        router.push('/#contact');
      } else {
        setCookie('lead', {...lead, id});
      }
    }

    formSteps.map((fs) => setError(fs.name, {}));
  }, [router, searchParams, setError]);

  const handlePartialSubmit = async (tier) => {
    try {
      setSending(true);
      const dataSoFar = getValues();
      const lead = getCookie('lead');
      const _fbc = getCookie('_fbc');
      const _fbp = getCookie('_fbp');
      const { id, email, phone } = JSON.parse(lead || '{}');

      const payload = { ...dataSoFar, id, email, phone, tier,  _fbc, _fbp };

      await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'},
      });

      fbEvent('Lead', { email, phone, externalID: id });
      router.push('/thankyou');
    } catch (e) {
      console.error('Partial submit failed', e);
    }
  };
  const onSubmit = async (data) => {
    try {
      setSending(true);
      const leadRaw = getCookie('lead');
      const _fbc = getCookie('_fbc');
      const _fbp = getCookie('_fbp');

      if (!leadRaw) {
        console.error('❌ No se encontró cookie lead');
        return;
      }

      let parsedLead;
      try {
        parsedLead = JSON.parse(leadRaw);
      } catch (err) {
        console.error('❌ Error al parsear cookie lead:', err);
        return;
      }

      const { id, email, phone } = parsedLead;

      const leadQA = LeadQualifier({ answers: data });
      console.log('leadQA', leadQA);
      const { status } = leadQA;

      const payload = { ...data, id, email, phone, status, _fbc, _fbp };

      const redirectURL = status === 'qualified' ? '/thankyou' : '/starter-marketing-manual';

      const res = await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.error('❌ Error en el fetch', res.status);
        return;
      }

      status === 'qualified' && fbEvent('Lead', { email, phone, externalID: id });

      router.push(redirectURL);
    } catch (error) {
      console.error('❌ Error en onSubmit:', error);
    }
  };

  const handleNext = async () => {
    const currentStep = formSteps[formStep];
    const formStepName = currentStep.name;

    const valid = await methods.trigger(formStepName);
    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);

    // Cuando ya tengamos las 3 respuestas clave, clasificamos y TERMINAMOS
    const have3 =
      !!methods.getValues('currentSales') &&
      !!methods.getValues('budget') &&
      !!methods.getValues('need');

    if (have3) {
      console.log(methods.getValues());

      const classification = classifyLead({
        currentSales: methods.getValues('currentSales'),
        budget: methods.getValues('budget'),
        need: methods.getValues('need'),
      });

      if (classification.action === 'submit') {
        await handlePartialSubmit(classification.tier);
        return; // finaliza aquí
      }
    }

    if (formStep < formSteps.length - 1) {
      setFormStep(formStep + 1);
    } else {
      await handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="relative flex flex-grow bg-black pointer-events-none">
      <div className="container !p-0 flex flex-col flex-grow items-center pointer-events-auto touch-auto">
        <div className="survey-card">
          <div className="w-full absolute left-0 top-0 bg-gray-100">
            <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
          </div>
          <p className="-ft-1">{formStep + 1}/{formSteps.length}</p>
          <FormProvider {...methods}>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {formSteps.map((fs, idx) => {
                if (fs.type === 'text') {
                  const {name, title, description, placeholder, inputOptions} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 flex-grow ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <input
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }

                if (fs.type === 'number') {
                  const {name, title, description, placeholder, inputOptions} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 flex-grow ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <input
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                        onKeyDown={restrictNumber}
                      />
                    </div>
                  );
                }

                if (fs.type === 'radio') {
                  const {name, title, description, placeholder, inputOptions, options, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'flex flex-col' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <Radio
                        name={name}
                        inputOptions={inputOptions}
                        placeholder={placeholder}
                        options={options}
                        optCols={cols}
                        className={inputError === idx ? '!border-brand-2' : undefined}
                      />
                    </div>
                  );
                }
                if (fs.type === 'checkbox') {
                  const {name, title, description, placeholder, inputOptions, options, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'flex flex-col' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <Checkbox
                        name={name}
                        inputOptions={inputOptions}
                        placeholder={placeholder}
                        options={options}
                        optCols={cols}
                        className={inputError === idx ? '!border-brand-2' : undefined}
                      />
                    </div>
                  );
                }
                if (fs.type === 'textarea') {
                  const {name, title, description, placeholder, inputOptions, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <textarea
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        rows={cols}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }
              })}

              <div className="flex justify-between w-full mt-auto">
                <button
                  type="button"
                  onClick={() => setFormStep(formStep - 1)}
                  className="!bg-transparent border-none hover:text-brand-1 disabled:text-gray-100"
                  disabled={formStep <= 0}
                >Atrás
                </button>
                <button
                  type="button"
                  disabled={sending}
                  onClick={() => handleNext()}
                  className="mt-auto"
                >
                  {sending && <span className="animate-spin mr-4">+</span>}
                  {formStep + 1 === formSteps.length ? 'Agendar cita' : sending ? 'Abriendo Calendario' : 'Siguiente'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}