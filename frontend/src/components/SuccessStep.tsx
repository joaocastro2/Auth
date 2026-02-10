import { CheckCircle2, LogOut } from 'lucide-react';

interface SuccessStepProps {
  onReset: () => void;
}

/**
 * Post-authentication success visualization component.
 * Displays a visual animation (mascot) and a confirmation message.
 * indicating that the token was successfully validated by the backend.
 */
const SuccessStep = ({ onReset }: SuccessStepProps) => (
  <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-500">
    <div className="w-40 h-40 mx-auto relative group">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md transition-transform group-hover:scale-110 duration-500">
        <circle cx="100" cy="100" r="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="100" cy="90" r="50" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
        {/* eyes */}
        <circle cx="85" cy="85" r="4" fill="#64748b" />
        <circle cx="115" cy="85" r="4" fill="#64748b" />
        {/* Smile */}
        <path d="M 85 105 Q 100 120 115 105" stroke="#64748b" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* hand */}
        <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
           <path d="M 140 100 L 140 70 Q 140 60 150 60 Q 160 60 160 70 L 160 110 L 140 110" fill="#fde047" stroke="#92400e" strokeWidth="2" />
           <rect x="130" y="100" width="35" height="40" rx="8" fill="#fde047" stroke="#92400e" strokeWidth="2" />
        </g>
      </svg>
      <div className="absolute bottom-4 right-4 bg-emerald-500 rounded-full p-1 text-white border-4 border-white">
        <CheckCircle2 size={24} />
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Sucesso!</h2>
      <p className="text-slate-500">Seu acesso foi validado com êxito.</p>
    </div>
    <button onClick={onReset} className="flex items-center gap-2 mx-auto text-slate-400 hover:text-slate-600 font-semibold transition-colors">
      <LogOut size={18} /> Sair da conta
    </button>
  </div>
);

export default SuccessStep;