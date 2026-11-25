'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';
import fbEvent from '@/services/fbEvents';
import { info } from '../../../info';
import LeadQualifier from '@/utils/leadQualifier';
import StepRenderer from '@/components/stepRenderer';
import { motion, AnimatePresence } from 'framer-motion';

export const formSteps = [
  {
    name: 'firstName',
    title: 'Ok, prometo hacer esto lo más sencillo posible.',
    description: 'Empecemos por tu nombre, el que más te guste. Para irnos tuteando desde ahorita.',
    type: 'text',
    inputOptions: {required: 'Compártenos tu nombre'},
    placeholder: 'Tu nombre',
  },
  {
    name: 'businessVertical',
    title: '¿En qué industria opera tu empresa?',
    description: 'Selecciona una.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'realEstate', label: 'Bienes Raíces / Construcción'},
      {value: 'professionalServices', label: 'Servicios Profesionales'},
      {value: 'medical', label: 'Salud / Médico / Dental'},
      {value: 'finance', label: 'Créditos / Seguros / Inversiones'},
      {value: 'industrial', label: 'Industria / Manufactura'},
      {value: 'technology', label: 'Tech / Software / SaaS'},
      {value: 'retail', label: 'Comercio (físico o en línea)'},
      {value: 'foodHospitality', label: 'Restaurantes / Alimentos / Hospitalidad'},
      {value: 'education', label: 'Educación / Formación'},
      {value: 'other', label: 'Otro'},
    ],
    cols: 1,
  },
  {
    name: 'customerType',
    title: '¿A quién le vendes?',
    description: 'La pregunta clave. Piensa de dónde viene la mayoría de tu dinero.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'b2b', label: 'A otros negocios<br/>(distribución o servicios)'},
      {
        value: 'highTicketConsumer',
        label: 'A alguien que evalúa a fondo antes de comprar',
      },
      {value: 'transactional', label: 'A consumidor final por impulso o en mostrador'},
      {value: 'mixed', label: 'Es una mezcla pareja, no sabría cuál pesa más'},
    ],
    cols: 1,
  },
  {
    name: 'about',
    title: '¿Qué vendes?',
    description: 'Descríbeme brevemente qué producto o servicio vendes y quién es tu cliente típico.',
    type: 'textarea',
    inputOptions: {required: 'Por fa, cuéntanos un poco'},
    placeholder:
      'Ej. Somos una constructora que desarrolla proyectos residenciales en Guadalajara. Nuestros clientes son familias de nivel medio-alto buscando casa propia.',
    cols: 6,
  },
  {
    name: 'currentSales',
    title: '¿Cuánto factura tu empresa al mes, aproximadamente?',
    description: 'Esto nos ayuda a medir el potencial de escalabilidad.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '<50k', label: 'Menos de $50,000 MXN'},
      {value: '50k-100k', label: '$50,000 a $100,000 MXN'},
      {value: '100k-300k', label: '$100,000 a $300,000 MXN'},
      {value: '300k-600k', label: '$300,000 a $600,000 MXN'},
      {value: '600k-1.5m', label: '$600,000 a $1,500,000 MXN'},
      {value: '1.5m+', label: 'Más de $1,500,000 MXN'},
    ],
    cols: 1,
  },
  {
    name: 'averageTicket',
    title: '¿Cuál es el valor promedio de cada venta que cierras?',
    description: 'Nos ayuda a calcular el retorno potencial de tener un sistema de cierre.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '<2.5k', label: 'Menos de $2,500 MXN'},
      {value: '2.5k-5k', label: '$2,500 a $5,000 MXN'},
      {value: '5k-15k', label: '$5,000 a $15,000 MXN'},
      {value: '15k-50k', label: '$15,000 a $50,000 MXN'},
      {value: '50k-150k', label: '$50,000 a $150,000 MXN'},
      {value: '150k+', label: 'Más de $150,000 MXN'},
    ],
    cols: 1,
  },
  {
    name: 'ltv',
    title: '¿Con qué frecuencia te vuelve a comprar un cliente?',
    description: 'Nos ayuda a estimar el valor real de cada cliente que traes.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '1x', label: 'No hay recompra, es venta única'},
      {value: '3x', label: '2 a 3 veces al año'},
      {value: '4x+', label: '4 o más veces al año'},
      {value: 'recurring', label: 'Es recurrente (mensualidad / suscripción)'},
    ],
    cols: 1,
  },
  {
    name: 'salesTeam',
    title: '¿De qué tamaño es tu equipo de ventas hoy?',
    description: 'Sin exagerar ni modestia.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'solo', label: 'Solo yo me encargo de vender'},
      {value: '1', label: '1 vendedor además de mí'},
      {value: '2-4', label: '2 a 4 vendedores'},
      {value: '5+', label: '5 o más vendedores'},
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
      const {id, email, phone} = JSON.parse(lead || '{}');

      const payload = {...dataSoFar, id, email, phone, tier, _fbc, _fbp};

      await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'},
      });

      fbEvent('Lead', {email, phone, externalID: id, fbc: _fbc, fbp: _fbp});
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

      const {id, email, phone} = parsedLead;

      const leadQA = LeadQualifier({answers: data});
      const {status} = leadQA;

      const payload = {...data, id, email, phone, leadQA, _fbc, _fbp};
      console.log('PAYLOAD', payload);

      const redirectURL = status === 'qualified' ? '/thankyou' : '/mapa-de-numeros';
      // const redirectURL = '/thankyou';

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

      status === 'qualified'
        ? fbEvent('Lead', { email, phone, externalID: id, fbc: _fbc, fbp: _fbp })
        : fbEvent('Not Elegible', {phone, email, externalID: id,  fbc: _fbc, fbp: _fbp});


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

    if (formStep < formSteps.length - 1) {
      setFormStep(formStep + 1);
    } else {
      await handleSubmit(onSubmit)();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    if (e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
    handleNext();
  };

  return (
    <div className="relative flex flex-grow pointer-events-none">
      <div className="container !p-0 flex flex-col flex-grow items-center pointer-events-auto touch-auto">
        <div className="survey-card">
          <div className="w-full absolute left-0 top-0 bg-gray-100">
            <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
          </div>
          <p className="-ft-1">{formStep + 1}/{formSteps.length}</p>
          <FormProvider {...methods}>
            <form
              className="flex flex-col flex-grow pt-12"
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={handleKeyDown}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={formStep} // importante para animaciones entre pasos
                  initial={{opacity: 0, x: 100}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: -100}}
                  transition={{duration: 0.4, ease: 'easeInOut'}}
                >
                  <StepRenderer
                    step={formSteps[formStep]}
                    index={formStep}
                    currentStep={formStep}
                    errors={errors}
                    inputError={inputError}
                    errorMessage={errors[formSteps[formStep]?.name]?.message}
                    register={register}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="fixed bottom-0 inset-x-0 bg-white mt-auto border-t p-8">
                <div className="max-w-[80rem] flex justify-between w-full mx-auto">
                  <button
                    type="button"
                    onClick={() => setFormStep(formStep - 1)}
                    className="!bg-transparent border-none hover:text-brand-1 disabled:text-gray-100"
                    disabled={formStep <= 0}
                  >←
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
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}