'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Radio } from '@/components/formAtoms';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';
import fbEvents from '@/services/fbEvents';

const formSteps = [
  'firstName',
  'businessVertical',
  'whyGrow',
  'budget',
  'services',
  'immediacy',
  'compromise',
  'commitment',
];

const immediacyOpts = [
  {value: 'instantly', label: 'De inmediato'},
  {value: '1month', label: 'En 1 mes'},
  {value: '3months', label: 'Máximo en 3 meses'},
];

const budgetOpts = [
  {value: '$15,000+', label: 'De $15,000 a $20,000 mxn'},
  {value: '$20,000+', label: '$20,000 a $50,000 mxn'},
  {value: '$50,000+', label: 'Más de $50,000 mxn'},
];

const services = [
  {value: 'consultancy', label: 'Que me enseñen para nosotros ejecutar'},
  {value: 'integral', label: 'Estrategia, producción y se encarguen de todo'},
  {value: 'socialMedia', label: 'Solo quiero que lleven mis redes'},
];

const businessVerticals = [
  {value: 'realEstate', label: 'Real Estate'},
  {value: 'professionalServices', label: 'Servicios Prof'},
  {value: 'medical', label: 'Servicios Médicos'},
  {value: 'finance', label: 'Finanzas'},
  {value: 'beautyAndSpa', label: 'Beauty and Spa'},
  {value: 'eCommerce', label: 'e-commerce'},
  {value: 'courses', label: 'Cursos'},
  {value: 'other', label: 'Otro'},
];

const compromiseOpts = [
  {value: 'yes', label: 'Claro! sin broncas'},
  {value: 'mid', label: 'Puedo buscar la forma'},
  {value: 'not', label: 'De plano no puedo'},
];

const commitmentOpts = [
  {value: 'yes', label: 'Claro!'},
  {value: 'maybe', label: 'Tal vez'},
  {value: 'remind', label: 'La neta necesito que me recuerden'},
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
        router.push('/#contact')
      } else {
        setCookie('lead', {...lead, id});
      }
    }

    formSteps.map((fs) => setError(fs, {}));
  }, [router, searchParams, setError]);


  const handleNext = () => {
    const formStepName = formSteps[formStep];
    if (errors[formStepName]) {
      setInputError(formStep);
      return;
    }
    setInputError(null);
    window.scrollTo(0,0)
    return formStep < 7 && setFormStep(formStep + 1);
  };

  const onSubmit = (data) => {
    setSending(true);
    const lead = getCookie('lead');
    const {id, email, phone} = JSON.parse(lead);
    const fbParams = fbEvents('Lead', id)
    const payload = {...data, id, email, phone, fbParams};

    fetch('https://hook.us1.make.com/f1yv4o13p65ywj5wni139fikancma8tj', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response)
      .then(() => {
        fbq('track', 'Lead')
        const url = 'https://notoriovsstudio.pipedrive.com/scheduler/bEE1rxHv/consultoria-gratuita';

        const forwardLink = document.createElement("a");
        forwardLink.href = url;
        forwardLink.target = "_blank";
        forwardLink.click();

        router.push('/thankyou')
      });
  };

  return (
    <div className="relative flex flex-grow bg-black pointer-events-none">
      <div className="container !p-0 flex flex-col flex-grow items-center pointer-events-auto touch-auto">
        <div className="survey-card">
          <div className="w-full absolute left-0 top-0 bg-gray-100">
            <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / 8) * 100}%`}}/>
          </div>
          {/*<p className="-ft-1">{formStep + 1}/8</p>*/}

          <FormProvider {...methods}>
            <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
              <div className={`my-20 ${formStep === 0 ? 'block' : 'hidden'}`}>
                <h1>Ok, prometo hacer esto lo más rápido y sencillo posible, <br/>son solo 8 preguntas.</h1>
                <p className="ft-3 sans my-12">Empecemos por tu nombre, el que más te guste. Para
                  empezarnos a <i>tutear</i>.</p>
                <input
                  {...register(
                    'firstName',
                    {required: 'Compártenos tu nombre'},
                  )}
                  placeholder="tu nombre"
                  className={inputError === 0 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 1 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-12">¿En qué industria encaja mejor tu empresa?</p>
                <Radio
                  name="businessVertical"
                  inputOptions={{required: 'Selecciona una opción'}}
                  placeholder="selecciona uno por fa"
                  options={businessVerticals}
                  className={inputError === 1 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 2 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-12">Cuéntame sobre tu negocio y por qué hoy es un buen momento para escalar</p>
                <textarea
                  {...register(
                    'whyGrow',
                    {required: 'Compártenos tu nombre'},
                  )}
                  placeholder="en 2 o 3 líneas... échale crema"
                  rows={4}
                  className={inputError === 2 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 3 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-6">¿Cuál es tu presupuesto mensual de marketing?</p>
                <p className="mb-12">Con todo y pautas en MXN</p>
                <Radio
                  name="budget"
                  inputOptions={{required: 'Selecciona una opción'}}
                  placeholder="con todo y pautas"
                  options={budgetOpts}
                  className={inputError === 3 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 4 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-12">¿Qué te interesa de trabajar con nosotros?</p>
                <Radio
                  name="services"
                  inputOptions={{required: 'Selecciona una opción'}}
                  placeholder="hay de 3 sopas"
                  options={services}
                  optCols={1}
                  className={inputError === 4 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 5 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-12">Si tu proyecto es aceptado, ¿cuándo tienes pensado
                  comenzar?</p>
                <Radio
                  name="immediacy"
                  inputOptions={{required: 'Selecciona una opción'}}
                  placeholder="...para irnos programando"
                  options={immediacyOpts}
                  className={inputError === 5 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 6 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-6">Hagamos un ejercicio realista, pues somos muy buenos pero no somos magos</p>
                <p className="mb-12">Piensa en cuanto quieres facturar al mes. ¿Estás dispuesto a invertir de un 10% a 20% en marketing para generar esa facturación?</p>
                <Radio
                  name="compromise"
                  inputOptions={{required: 'Selecciona una opción'}}
                  placeholder="no nos agüitamos, sé honesto"
                  options={compromiseOpts}
                  optCols={3}
                  className={inputError === 6 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className={`my-20 ${formStep === 7 ? 'block' : 'hidden'}`}>
                <p className="ft-3 sans mb-12">¿Prometes atender a la sesión que estás a punto de
                  agendar? No está chido que nos dejes plantados</p>
                <Radio
                  name="commitment"
                  inputOptions={{required: 'Selecciona una opción'}}
                  options={commitmentOpts}
                  className={inputError === 7 ? '!border-brand-2' : undefined}
                />
              </div>

              <div className="flex justify-between w-full mt-auto">
                <button
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