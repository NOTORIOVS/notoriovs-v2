import { info } from '../../../../info';
import Image from 'next/image';

export default function TermsAndConditions() {
  return (
    <div className="container py-40 text-block terms-conditions">
      <h1>Términos y Condiciones de Servicios de Notoriovs Studio</h1>
      <p><strong>Última actualización:</strong> 2024-11-10</p>

      <h2>1. Aceptación de los Términos</h2>
      <p>Al contratar los servicios de Notoriovs Studio, el cliente (en adelante, “El Cliente”) acepta cumplir con los
        términos y condiciones aquí descritos, complementarios a los especificados en la propuesta comercial.</p>

      <h2>2. Alcance de los Servicios</h2>
      <h3>2.1 Descripción de los Servicios</h3>
      <p>Notoriovs Studio se compromete a prestar los servicios detallados en la propuesta comercial aprobada por El
        Cliente. Estos servicios pueden incluir, pero no se limitan a, actividades de marketing digital, desarrollo de
        contenido, diseño gráfico, asesoría estratégica y cualquier otra actividad descrita en la propuesta.</p>

      <h3>2.2 Modificaciones en el Alcance</h3>
      <p>Cualquier modificación en el alcance de los servicios, ya sea en términos de tareas adicionales o ajustes en
        los entregables, deberá ser aprobada previamente por ambas partes. El Cliente comprende que dichos cambios
        pueden implicar un ajuste en los tiempos de entrega y/o en el presupuesto acordado.</p>

      <h3>2.3 Condiciones de Ejecución</h3>
      <p>El Cliente se compromete a proporcionar toda la información, acceso y recursos necesarios para la correcta y
        eficiente ejecución de los servicios, incluyendo archivos, datos de acceso a plataformas digitales y respuestas
        oportunas a consultas de Notoriovs Studio. Notoriovs Studio no será responsable por retrasos o incumplimientos
        debidos a la falta de colaboración o entrega oportuna de estos recursos.</p>

      <h3>2.4 Entregables y Revisión</h3>
      <p>Los entregables estarán en línea con las especificaciones y objetivos establecidos en la propuesta comercial.
        El Cliente dispondrá de un plazo de 3 días hábiles para revisar cada entregable y solicitar ajustes o
        revisiones. Si el Cliente no responde en este plazo, el entregable se considerará aprobado.</p>

      <h2>3. Pagos y Acceso a Servicios</h2>
      <h3>3.1 Condiciones de Pago</h3>
      <p>El Cliente se compromete a realizar el pago de los servicios en las fechas establecidas en la cotización
        incluida en la propuesta comercial. En caso de incumplimiento, se otorgará una prórroga de 5 días naturales para
        que El Cliente regularice el pago sin afectar el acceso a los servicios. Si el pago no se efectúa dentro de este
        plazo, se activarán las siguientes medidas hasta que se liquide el saldo pendiente:</p>

      <h3>3.2 Suspensión de Automatizaciones y Acceso a Base de Datos</h3>
      <ul>
        <li>Todas las automatizaciones que reportan los prospectos generados serán pausadas.</li>
        <li>Se suspenderá el acceso a la base de datos de prospectos gestionada por Notoriovs Studio.</li>
      </ul>

      <h3>3.3 Continuación de Servicios de Campañas y Creación de Contenido</h3>
      <p>La suspensión de acceso no afectará la ejecución de campañas ni los servicios contratados para la creación de
        anuncios y/o mailing. Estas actividades continuarán conforme a lo establecido en la propuesta comercial;
        únicamente se pausarán las automatizaciones y el acceso a la base de datos.</p>

      <h3>3.4 Reactivación de Accesos y Automatizaciones</h3>
      <p>Los accesos y las automatizaciones suspendidos se reactivarán automáticamente una vez que el pago pendiente
        haya sido procesado.</p>

      <h3>3.5 Inversión en Pautas Publicitarias</h3>
      <p>Para lograr los objetivos, el CLIENTE deberá invertir en pautas publicitarias durante la duración del
        proyecto. Si no se realiza esta inversión, LA AGENCIA no se responsabiliza por el fracaso de la campaña.</p>

      <h2>4. Derechos y Obligaciones de las Partes</h2>
      <h3>4.1 Obligaciones de Notoriovs Studio</h3>
      <p>Notoriovs Studio se compromete a ejecutar los servicios descritos con profesionalismo y de acuerdo con los
        estándares de calidad mencionados en la propuesta comercial.</p>

      <h3>4.2 Obligaciones de El Cliente</h3>
      <p>El Cliente deberá proporcionar toda la información, acceso y recursos necesarios para que Notoriovs Studio
        pueda realizar los servicios de manera eficiente y dentro del plazo acordado.</p>

      <h2>5. Modificación de los Términos y Condiciones</h2>
      <p>Notoriovs Studio se reserva el derecho de modificar estos Términos y Condiciones. Cualquier cambio será
        notificado al Cliente por escrito y entrará en vigor 30 días después de dicha notificación, salvo que el Cliente
        notifique su desacuerdo por escrito antes de la fecha de entrada en vigor.</p>

      <h2>6. Política de Cancelación y Terminación</h2>
      <p>6.1 Cualquiera de las partes podrá terminar el acuerdo notificando por escrito con un preaviso de 30 días.</p>
      <p>6.2 En caso de cancelación anticipada por parte del Cliente, este será responsable de pagar los servicios
        proporcionados hasta
        la fecha de terminación, así como los gastos adicionales acordados previamente en la propuesta comercial.</p>

      <h2>7. Resolución de Disputas</h2>
      <p>En caso de disputa, ambas partes acuerdan intentar resolver la situación mediante negociación directa. Si no se
        llega a una resolución, las partes podrán recurrir a un proceso de mediación o arbitraje de acuerdo con la
        jurisdicción de los tribunales de Guadalajara, Jalisco.</p>

      <h2>8. Jurisdicción</h2>
      <p>Para la interpretación, ejecución y cumplimiento del presente acuerdo, las partes acuerdan someterse a la
        legislación de los Estados Unidos Mexicanos y a la jurisdicción de los tribunales de Guadalajara, Jalisco,
        renunciando a cualquier otro fuero.</p>

      <h2>9. Propiedad Intelectual</h2>
      <p>Notoriovs Studio no está generando ninguna clase de derechos de autor, ya que únicamente se encuentra prestando
        sus conocimientos profesionales para el desarrollo del proyecto especificado en la propuesta comercial.
        Sin embargo, Notoriovs Studio queda con el derecho de utilizar libremente el material creado para El Cliente
        para su propia promoción y comunicación.</p>

      <h2>10. Confidencialidad</h2>
      <p>Ambas partes se comprometen a mantener la confidencialidad de cualquier información sensible compartida en el
        marco de este acuerdo, incluyendo, pero no limitándose a, información comercial, técnica y financiera.</p>

      <div className="border-t border-dashed border-gray-400 mt-20 py-8">
        <div className="relative pt-16">
          <Image src="/images/NT-Logotype-H.png" alt="Notoriovs Studio" layout="fill" objectFit="contain"/>
        </div>
      </div>
    </div>
  );
}