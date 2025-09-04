'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Radio } from '@/components/formAtoms';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';
import { restrictNumber } from '@/utils/formValidators';
import fbEvent from '@/services/fbEvents';
import { info } from '../../../../info';

const formSteps = [
  {
    name: 'firstName',
    title: `Ok, prometo hacer esto lo más rápido y sencillo posible.`,
    description: `Empecemos por tu nombre, el que más te guste. Para empezarnos a <i>tutear</i>.`,
    type: 'text',
    inputOptions: {required: 'Compártenos tu nombre'},
    placeholder: 'Tu nombre',
  },
  {
    name: 'businessVertical',
    title: '¿En qué industria encaja mejor tu empresa?',
    description: 'Selecciona una por fa',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'realEstate', label: 'Real Estate'},
      {value: 'professionalServices', label: 'Servicios Prof'},
      {value: 'medical', label: 'Servicios Médicos'},
      {value: 'finance', label: 'Finanzas'},
      {value: 'beautyAndSpa', label: 'Beauty and Spa'},
      {value: 'eCommerce', label: 'e-commerce'},
      {value: 'restaurant', label: 'Restaurant'},
      {value: 'courses', label: 'Cursos'},
      {value: 'other', label: 'Otro'},
    ],
    cols: 3,
  },
  {
    name: 'about',
    title: '¿Qué vendes y cómo lo vendes?',
    description: 'Breve descripción: producto/servicio + cómo consigues clientes hoy.',
    type: 'textarea',
    placeholder: 'Ej. Somos una consultora legal que trabaja con PYMEs. Nuestros clientes llegan principalmente por recomendación y algunos esfuerzos en LinkedIn.',
    cols: 4,
  },
  {
    name: 'currentSales',
    title: '¿Cuánto vendes al mes, aproximadamente?',
    description: 'Esto nos ayuda a medir potencial de escalabilidad.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '<$50,000', label: 'Menos de $50,000 mxn'},
      {value: '$50,000-$100,000', label: '$50,000 a $100,000 mxn'},
      {value: '$100,000-$300,000', label: '$100,000 a $300,000 mxn'},
      {value: '$300,000-$500,000', label: '$300,000 a $500,000 mxn'},
      {value: '$500,000+', label: 'Más de $500,000 mxn'},
    ],
    cols: 1,
  },
  {
    name: 'averageTicket',
    title: '¿Cuál es el valor promedio de cada venta en tu negocio?',
    description: 'Esto nos ayuda a calcular el retorno de inversión esperado y ver qué tan rentable puede ser escalar tu prospección',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '<$1,000', label: 'Menos de $1,000 MXN'},
      {value: '$1,000-$5,000', label: '$1,000 a $5,000 MXN'},
      {value: '$5,000-$20,000', label: '$5,000 a $20,000 MXN'},
      {value: '$20,000-$100,000', label: '$20,000 a $100,000 MXN'},
      {value: '$100,000+', label: 'Más de $100,000 MXN'}
    ],
    cols: 1,
  },
  {
    name: 'budget',
    title: '¿Cuál es tu presupuesto mensual aproximado para marketing?',
    description: 'Incluyendo pauta + equipo/agencia (si aplica)',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '<$10,000', label: 'Menos de $10,000 mxn'},
      {value: '$10,000-$25,000', label: '$10,000 a $25,000 mxn'},
      {value: '$25,000-$50,000', label: '$25,000 a $50,000 mxn'},
      {value: '$50,000+', label: 'Más de $50,000 mxn'},
    ],
    cols: 1,
  },
  {
    name: 'need',
    title: '¿Qué describe mejor tu situación actual?',
    description: 'Selecciona lo que más te hace sentido.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'advice', label: 'Aún no tengo campañas, necesito empezar desde cero'},
      {value: 'setUp', label: 'Tengo campañas pero no son consistentes'},
      {value: 'strategy', label: 'Tengo equipo/agencia, pero necesito dirección estratégica'},
      {value: 'growthPartner', label: 'Tengo resultados estables y quiero escalar con un aliado'},
    ],
    cols: 1,
  },
  {
    name: 'targetSales',
    title: '¿Cuál es tu meta de ventas mensual?',
    description: 'Para poder construir un plan de crecimiento al rededor de esta meta.',
    type: 'text',
    inputOptions: {required: 'Selecciona una opción'},
  },
  {
    name: 'whyGrow',
    title: '¿Cuéntame por qué hoy es un buen momento para escalar?',
    type: 'textarea',
    placeholder: 'Ej. Queremos superar los $300k/mes para contratar equipo comercial y crecer en CDMX. Buscamos dejar de depender solo de referidos.',
    cols: 4,
  },
  {
    name: 'compromise',
    title: '¿Cuál es tu disposición actual para invertir en marketing?',
    description: `
      Nuestros programas empiezan desde $4,000 MXN por diagnóstico 
      y pueden superar los $26,000 MXN al mes por una dirección de marketing, 
      más el presupuesto de pautas.<br/><br/>
      La idea siempre es que cada peso invertido busque retornos de 3x a 10x, 
      dependiendo de tu negocio y su etapa.`,
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'low', label: 'Estoy explorando opciones, hoy no puedo invertir mucho'},
      {value: 'medium', label: 'Podría invertir si me hace sentido el plan'},
      {value: 'high', label: 'Estoy listo para invertir si veo retorno claro'},
    ],
    cols: 1,
  },
  {
    name: 'immediacy',
    title: 'Si tu proyecto es aceptado, ¿cuándo tienes pensado comenzar?',
    description: '...para irnos programando',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'noDate', label: 'No tengo idea'},
      {value: '3months', label: 'Máximo en 3 meses'},
      {value: '1month', label: 'En 1 mes'},
      {value: 'instantly', label: 'De inmediato'},
    ],
  },
  {
    name: 'commitment',
    title: 'Si resultas calificado, ¿prometes asistir puntual a la sesión que estás a punto de agendar?',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'no', label: 'No estoy seguro'},
      {value: 'remind', label: 'Recuérdenme por favor'},
      {value: 'yes', label: 'Si, atento!'},
    ],
    cols: 3,
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
      const { tier } = classifyLead({
        currentSales: data.currentSales,
        budget: data.budget,
        need: data.need,
      });

      const payload = { ...data, id, email, phone, tier, _fbc, _fbp };
      console.log('payload', payload);

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

      fbEvent('Lead', { email, phone, externalID: id });

      router.push('/thankyou');
    } catch (error) {
      console.error('❌ Error en onSubmit:', error);
    }
  };
  const classifyLead = ({ currentSales, budget, need }) => {
    const SALES_RANK = {
      '<$50,000': 0,
      '$50,000-$100,000': 1,
      '$100,000-$300,000': 2,
      '$300,000-$500,000': 3,
      '$500,000+': 4
    };
    const BUDGET_RANK = {
      '<$10,000': 0,
      '$10,000-$25,000': 1,
      '$25,000-$50,000': 2,
      '$50,000+': 3,
    };
    const NEED_RANK = {
      advice: 0,
      setUp: 1,
      strategy: 2,
      growthPartner: 3,
    };

    const s = SALES_RANK[currentSales] ?? -1;
    const b = BUDGET_RANK[budget] ?? -1;
    const n = NEED_RANK[need] ?? -1;

    // Salida temprana
    if (s <= 0 && b <= 0 && n <= 0) {
      console.log('branch: early_exit');
      return { tier: 'free_consult', reason: 'early_exit_low', action: 'submit' };
    }

    // Partnership
    if (s >= 2 && b >= 1 && n >= 2) {
      console.log('branch: partnership');
      return { tier: 'partnership', reason: 'high sales & budget & need', action: 'continue' };
    }

    // Set Up
    if (s >= 1 && b >= 1 && n >= 1) {
      console.log('branch: setup');
      return { tier: 'setup', reason: 'mid-high sales & budget, setup/strategy', action: 'continue' };
    }

    // Fallback Diagnóstico
    console.log('branch: diagnostic');
    return { tier: 'diagnostic', reason: 'entry tier', action: 'submit' };
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