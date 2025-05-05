'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Radio } from '@/components/formAtoms';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';
import { restrictNumber } from '@/utils/formValidators';
import fbEvents from '@/services/fbEvents';

const formSteps = [
  {
    name: 'firstName',
    title: `Ok, prometo hacer esto lo más rápido y sencillo posible, <br/>son solo 8 preguntas.`,
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
    title: 'Cuéntame sobre tu negocio, ¿qué haces?',
    type: 'textarea',
    placeholder: 'en 2 o 3 líneas... échale crema',
    cols: 4,
  },
  {
    name: 'budget',
    title: '¿Cuál es tu presupuesto mensual de marketing?',
    description: 'Con todo y pautas en MXN',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '$15,000+', label: '$15,000 a $20,000 mxn'},
      {value: '$20,000+', label: '$20,000 a $50,000 mxn'},
      {value: '$50,000+', label: 'Más de $50,000 mxn'},
    ],
    cols: 1,
  },
  {
    name: 'whyGrow',
    title: '¿Por qué hoy es un buen momento para escalar?',
    type: 'textarea',
    placeholder: 'Cuéntame que planes traes',
    cols: 4,
  },
  {
    name: 'immediacy',
    title: 'Si tu proyecto es aceptado, ¿cuándo tienes pensado comenzar?',
    description: '...para irnos programando',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '3months', label: 'Máximo en 3 meses'},
      {value: '1month', label: 'En 1 mes'},
      {value: 'instantly', label: 'De inmediato'},
    ],
  },
  {
    name: 'compromise',
    title: 'Ok, esta pregunta es la buena. Pues dicen que somos muy buenos pero tampoco somos magos.',
    description: 'Nuestros servicios van desde los $8,000 MXN al mes más pautas. <br/><br/>Siendo conservadores, y según tu producto o servicio, podemos multiplicar el total de tu inversión (honorarios + pautas) por 5x, aunque lo hemos hecho hasta por 10x. <br/><br/>Estás dispuesto a invertir con este esquema?',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'not', label: 'De plano no puedo'},
      {value: 'can find the way', label: 'Puedo buscar la forma'},
      {value: 'no problem', label: 'Claro! sin broncas'},
    ],
    cols: 3,
  },
  {
    name: 'commitment',
    title: '¿Prometes atender a la sesión que estás a punto de agendar? No está chido que nos dejes plantados',
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
  const {register, handleSubmit, setError, formState: {errors}} = methods;

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

  console.log('formStep', formStep);

  const handleNext = () => {
    const formStepName = formSteps[formStep].name;
    if (errors[formStepName]) {
      setInputError(formStep);
      return;
    }
    setInputError(null);
    window.scrollTo(0, 0);
    return formStep < 7 && setFormStep(formStep + 1);
  };

  const onSubmit = (data) => {
    setSending(true);
    const lead = getCookie('lead');
    const {id, email, phone} = JSON.parse(lead);
    const fbParams = fbEvents('Lead', id);
    const payload = {...data, id, email, phone, fbParams};

    fetch('https://hook.us1.make.com/f1yv4o13p65ywj5wni139fikancma8tj', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response)
      .then(() => {
        fbq('track', 'Lead');
        // const url = 'https://notoriovsstudio.pipedrive.com/scheduler/bEE1rxHv/consultoria-gratuita';
        //
        // const forwardLink = document.createElement('a');
        // forwardLink.href = url;
        // forwardLink.target = '_blank';
        // forwardLink.click();

        router.push('/thankyou');
      });
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
                  type={formStep < 7 ? 'button' : 'submit'}
                  disabled={sending}
                  onClick={() => handleNext()}
                  className="mt-auto"
                >
                  {sending && <span className="animate-spin mr-4">+</span>}
                  {formStep === 7 ? 'Agendar cita' : sending ? 'Abriendo Calendario' : 'Siguiente'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}