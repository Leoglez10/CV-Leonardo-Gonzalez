import React, { useState, useEffect, useCallback } from 'react';
import { X, FileText, CheckCircle, Loader2, AlertCircle, Download } from 'lucide-react';

interface CvDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modal reutilizable para descarga de CV en español e inglés.
 * Incluye feedback visual de loading/success/error.
 */
const CvDownloadModal: React.FC<CvDownloadModalProps> = ({ isOpen, onClose }) => {
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Cerrar con Escape
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && downloadStatus !== 'loading') {
            onClose();
        }
    }, [downloadStatus, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    // Resetear al cerrar
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setDownloadStatus('idle'), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, fileName: string, fileUrl: string) => {
        e.preventDefault();
        setDownloadStatus('loading');

        setTimeout(() => {
            try {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setDownloadStatus('success');
                setTimeout(() => onClose(), 1500);
            } catch (error) {
                console.error("Error downloading file:", error);
                setDownloadStatus('error');
                setTimeout(() => setDownloadStatus('idle'), 2000);
            }
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
        >
            <div className="bg-zinc-950 rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200 overflow-hidden min-h-[400px] flex flex-col justify-center border border-white/10">

                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>

                <button
                    onClick={onClose}
                    disabled={downloadStatus === 'loading'}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Cerrar modal de descarga"
                >
                    <X size={20} />
                </button>

                {downloadStatus === 'idle' ? (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-900/20 rounded-full flex items-center justify-center">
                                <FileText className="text-primary-500" size={32} />
                            </div>
                            <h3 id="cv-modal-title" className="text-2xl font-bold text-white">Descargar Currículum</h3>
                            <p className="text-zinc-400 mt-2 text-sm">Selecciona el idioma del documento</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href="/cv-espanol.pdf"
                                onClick={(e) => handleDownload(e, "CV_Leonardo_Gonzalez_ES.pdf", "/cv-espanol.pdf")}
                                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-primary-500 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-900"
                                aria-label="Descargar Currículum en Español"
                            >
                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">🇲🇽</div>
                                <span className="font-bold text-slate-200 group-hover:text-primary-400 transition-colors">Español</span>
                                <span className="text-xs text-zinc-400 mt-1 mb-3">Formato PDF</span>
                                <div className="flex items-center text-xs font-semibold text-primary-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Descargar <Download size={14} className="ml-1" />
                                </div>
                            </a>

                            <a
                                href="/cv-english.pdf"
                                onClick={(e) => handleDownload(e, "CV_Leonardo_Gonzalez_EN.pdf", "/cv-english.pdf")}
                                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-primary-500 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-900"
                                aria-label="Download CV in English"
                            >
                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">🇺🇸</div>
                                <span className="font-bold text-slate-200 group-hover:text-primary-400 transition-colors">English</span>
                                <span className="text-xs text-zinc-400 mt-1 mb-3">PDF Format</span>
                                <div className="flex items-center text-xs font-semibold text-primary-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Download <Download size={14} className="ml-1" />
                                </div>
                            </a>
                        </div>

                        <p className="text-xs text-zinc-400 text-center mt-8">
                            Documento actualizado a {new Date().getFullYear()}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center animate-in fade-in duration-300 py-8">
                        {downloadStatus === 'loading' && (
                            <>
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-primary-900/30 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                    <Loader2 className="relative z-10 text-primary-500 animate-spin" size={64} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Descargando...</h3>
                                <p className="text-zinc-400">Por favor espera un momento</p>
                            </>
                        )}

                        {downloadStatus === 'success' && (
                            <>
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-green-900/30 rounded-full blur-xl opacity-50"></div>
                                    <CheckCircle className="relative z-10 text-green-500 animate-in zoom-in duration-300" size={64} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">¡Descarga Completada!</h3>
                                <p className="text-zinc-400">Gracias por tu interés</p>
                            </>
                        )}

                        {downloadStatus === 'error' && (
                            <>
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-red-900/30 rounded-full blur-xl opacity-50"></div>
                                    <AlertCircle className="relative z-10 text-red-500 animate-in zoom-in duration-300" size={64} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Error en la descarga</h3>
                                <p className="text-zinc-400">Por favor intenta de nuevo</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CvDownloadModal;
