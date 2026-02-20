import React, { useState } from 'react';
import { personalInfo } from '../data';
import { Mail, Phone, MapPin, Download, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import CvDownloadModal from './ui/CvDownloadModal';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Contact (Contacto)
 * Sección de contacto con información directa y formulario de contacto.
 */
const Contact: React.FC = () => {
  const [showCvModal, setShowCvModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // Envío via Formspree — reemplazar el ID con tu endpoint real
      const response = await fetch('https://formspree.io/f/xledjjgn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-zinc-950/40 scroll-mt-20 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Encabezado */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900/30 border border-primary-700/50 mb-6">
              <Mail className="text-primary-500" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Contáctame
            </h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto">
              Estoy disponible para proyectos freelance o contratación
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Columna izquierda — Info de contacto */}
          <ScrollReveal width="100%" delay={200}>
            <div className="md:col-span-2">
              <p className="text-zinc-400 text-base mb-8 max-w-md leading-relaxed">
                Si tienes alguna propuesta o simplemente quieres saludar,
                no dudes en escribirme por cualquier medio o usando el formulario.
              </p>

              <div className="space-y-5">
                {/* Ubicación */}
                <div className="flex items-center text-zinc-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:border-primary-700/50 transition-colors">
                    <MapPin className="text-primary-500" size={18} />
                  </div>
                  <span>{personalInfo.location}</span>
                </div>
                {/* Teléfono */}
                <a href={`tel:${personalInfo.phone}`} className="flex items-center text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:border-primary-700/50 transition-colors">
                    <Phone className="text-primary-500" size={18} />
                  </div>
                  <span>{personalInfo.phone}</span>
                </a>
                {/* Email */}
                <a href={`mailto:${personalInfo.email}`} className="flex items-center text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:border-primary-700/50 transition-colors">
                    <Mail className="text-primary-500" size={18} />
                  </div>
                  <span>{personalInfo.email}</span>
                </a>
              </div>

              {/* Botón de Descarga CV */}
              <div className="mt-8">
                <button
                  onClick={() => setShowCvModal(true)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-base font-medium rounded-full text-white bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-700"
                >
                  Descargar CV
                  <Download size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Columna derecha — Formulario */}
          <ScrollReveal width="100%" delay={400}>
            <div className="md:col-span-3">
              <div className="w-full max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 lg:p-8 shadow-2xl shadow-black/30">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60 transition-all duration-300"
                        placeholder="Tu nombre"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60 transition-all duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60 transition-all duration-300"
                      placeholder="¿Sobre qué quieres hablar?"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                      Mensaje
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60 transition-all duration-300 resize-none"
                      placeholder="Cuéntame sobre tu proyecto o idea..."
                    />
                  </div>

                  {/* Botón enviar + feedback */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full text-white bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <Send size={16} className="ml-2" />
                        </>
                      )}
                    </button>

                    {/* Mensajes de estado */}
                    {formStatus === 'success' && (
                      <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm animate-in fade-in duration-300">
                        <CheckCircle size={16} />
                        <span>¡Mensaje enviado correctamente!</span>
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="mt-3 flex items-center gap-2 text-red-400 text-sm animate-in fade-in duration-300">
                        <AlertCircle size={16} />
                        <span>Error al enviar. Intenta de nuevo.</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* CV Download Modal */}
      <CvDownloadModal isOpen={showCvModal} onClose={() => setShowCvModal(false)} />
    </section>
  );
};

export default Contact;