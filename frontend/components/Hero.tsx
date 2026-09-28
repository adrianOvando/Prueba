'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Headphones, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colección Premium 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Tecnología innovadora diseñada para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">potenciar tu mundo</span>.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Explora las mejores laptops, smartphones, periféricos y gadgets con garantía oficial. Experiencia de compra ágil respaldada por arquitectura moderna NestJS + Next.js.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all transform active:scale-95"
            >
              <span>Ver Productos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400">
              ✓ Pagos seguros SSL &nbsp;•&nbsp; ✓ Devoluciones gratuitas
            </span>
          </div>
        </div>

        {/* Value props */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Envío Rápido</h4>
              <p className="text-xs text-slate-400">Entrega en 24/48 horas</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Garantía Total</h4>
              <p className="text-xs text-slate-400">2 años de cobertura oficial</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Soporte 24/7</h4>
              <p className="text-xs text-slate-400">Atención técnica personalizada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
