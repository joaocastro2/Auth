import { useState, useRef } from 'react';
import { Building2, ArrowRight, Loader2, AlertCircle, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AuthService } from './services/AuthService';

export default function App() {
  const [step, setStep] = useState<'cnpj' | 'token' | 'success'>('cnpj');
  const [cnpj, setCnpj] = useState('');
  const [token, setToken] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleTokenChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newToken = [...token];
    newToken[index] = value.substring(value.length - 1);
    setToken(newToken);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (error) setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !token[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      if (step === 'cnpj') {
        const exists = await AuthService.sendToken(cnpj);
        exists ? setStep('token') : setError("CNPJ não autorizado.");
      } else {
        const isValid = await AuthService.verifyToken(cnpj, token.join(''));
        isValid ? setStep('success') : setError("Token inválido.");
      }
    } catch (err) {
      setError("Falha na conexão.");
    } finally {
      setLoading(false);
    }
  };

  const getThemeColor = () => {
    if (error) return '#ef4444'; // Red
    if (step === 'success') return '#10b981'; // Esmerald
    return '#3b82f6'; // Blue
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 font-sans antialiased text-slate-900">
      <main className={`w-full max-w-[800px] bg-white rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col md:flex-row min-h-[540px] transition-all duration-500 ${error ? 'animate-shake' : ''}`}>
        
        <section className="flex-[1.1] p-8 md:p-14 flex flex-col justify-center relative bg-white">
          <header className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-slate-900 rounded-lg shadow-lg">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <h1 className="text-lg font-black tracking-tighter text-slate-800 uppercase">
              AL <span className="text-slate-400 font-medium">SEGURANÇA</span>
            </h1>
          </header>

          {step !== 'success' ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Identificação</h2>
                <p className="text-slate-400 text-xs mt-1">Para acessar o portal, digite um cnpj válido.</p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl flex items-center gap-3">
                  <AlertCircle className="text-red-500" size={16} />
                  <p className="text-red-800 text-[10px] font-black uppercase tracking-widest">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">CNPJ</label>
                  <div className="relative">
                    <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-slate-300'}`} size={18} />
                    <input
                      type="text" disabled={step === 'token' || loading} value={cnpj}
                      onChange={(e) => { setCnpj(e.target.value.replace(/\D/g, '').substring(0, 14)); if(error) setError(null); }}
                      placeholder="00.000.000/0000-00"
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all font-bold text-base
                        ${error ? 'bg-red-50 border-red-100 text-red-900' : 'bg-slate-50 border-slate-50 focus:bg-white focus:border-slate-900 text-slate-700'}`}
                    />
                  </div>
                </div>

                {step === 'token' && (
                  <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex justify-between px-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Código Token</label>
                      <button onClick={() => setStep('cnpj')} className="text-[9px] font-bold text-slate-400 hover:text-red-500 uppercase">Voltar</button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {token.map((digit, i) => (
                        <input
                          key={i} ref={(el) => { inputRefs.current[i] = el; }}
                          type="text" maxLength={1} value={digit}
                          onChange={(e) => handleTokenChange(e.target.value, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          className={`w-full h-12 text-center text-xl font-black rounded-xl border-2 transition-all outline-none
                            ${error ? 'border-red-200 bg-red-50 text-red-600' : digit ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-slate-50 border-slate-50 focus:border-slate-900'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={loading || (step === 'cnpj' ? cnpj.length < 14 : token.join('').length < 6)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98] disabled:opacity-20
                  ${error ? 'bg-red-600 text-white' : 'bg-slate-900 hover:bg-black text-white'}`}
              >
                {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : (
                  <div className="flex items-center justify-center gap-2">
                    {step === 'cnpj' ? 'Enviar Token' : 'Entrar no Sistema'}
                    <ArrowRight size={16} />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200">
                <CheckCircle2 className="text-white" size={30} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Bem-vindo</h2>
              <p className="text-slate-500 mt-2 mb-8 text-sm font-medium">Sessão iniciada com sucesso sob proteção AL.</p>
              <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
                <LogOut size={14} /> Sair do Portal
              </button>
            </div>
          )}
        </section>

        {/* Octopus Dinamic Right Side */}
        <section className={`flex-1 flex flex-col items-center justify-center p-12 transition-all duration-700 relative 
          ${error ? 'bg-red-950' : step === 'success' ? 'bg-emerald-600' : 'bg-slate-900'}`}>
          
          <div className="relative w-full max-w-[200px] text-center">
            <svg viewBox="0 0 200 200" className={`w-full h-auto drop-shadow-2xl transition-transform duration-500 ${error ? 'scale-110' : 'animate-float'}`}>
              
              {/* Body */}
              <path 
                d="M45,100 C45,40 155,40 155,100 C155,135 130,155 100,155 C70,155 45,135 45,100" 
                fill="none"
                stroke={getThemeColor()}
                strokeWidth={error ? "4" : "2"}
                className="transition-all duration-500" 
              />
              
              {/* Tentácles */}
              {[
                error ? "M60,145 L30,180" : "M60,145 Q40,170 50,185", 
                error ? "M80,153 L70,195" : "M80,153 Q80,185 90,190", 
                "M100,155 L100,195", 
                error ? "M120,153 L130,195" : "M120,153 Q120,185 110,190", 
                error ? "M140,145 L170,180" : "M140,145 Q160,170 150,185"
              ].map((d, i) => (
                <path 
                  key={i} d={d} fill="none" 
                  stroke={getThemeColor()} 
                  strokeWidth={error ? "5" : "3"} 
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              ))}

              {/* eyes */}
              {error ? (
                <g className="animate-pulse">
                  <path d="M65,90 L90,105" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                  <path d="M135,90 L110,105" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                </g>
              ) : (
                <g>
                  <circle cx="80" cy="95" r="4" fill={step === 'success' ? "#ffffff" : "#10B981"} />
                  <circle cx="120" cy="95" r="4" fill={step === 'success' ? "#ffffff" : "#10B981"} />
                </g>
              )}
            </svg>
            
            <div className="mt-10 space-y-2">
              <p className={`font-black text-[9px] uppercase tracking-[0.4em] transition-colors duration-500
                ${error ? 'text-red-500' : 'text-white opacity-40'}`}>
                {error ? "Acesso Negado" : step === 'success' ? "Octo Guard Ativo" : "Protocolo AL-08"}
              </p>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-8px); } 80% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
}