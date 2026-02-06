import { useState } from 'react';
import { Building2, ArrowRight, Loader2, AlertCircle, LogOut, CheckCircle2 } from 'lucide-react';
import { AuthService } from './services/AuthService';

export default function App() {
  const [step, setStep] = useState<'cnpj' | 'token' | 'success'>('cnpj');
  const [cnpj, setCnpj] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCnpjChange = (val: string) => {
    const onlyNums = val.replace(/\D/g, '');
    if (onlyNums.length <= 14) setCnpj(onlyNums);
    if (val === '') setError(null); 
  };

  const handleNext = async () => {
    if (loading) return;
    setLoading(true);
    setError(null); 
    
    try {
      if (step === 'cnpj') {
        const exists = await AuthService.sendToken(cnpj);
        if (!exists) { 
          setError("CNPJ não encontrado."); 
          setLoading(false);
          return; 
        }
        setStep('token');
      } else {
        const isValid = await AuthService.verifyToken(cnpj, token);
        if (!isValid) { 
          setError("Token inválido."); 
          setLoading(false);
          return; 
        }
        setStep('success');
      }
    } catch (err) {
      setError("Erro na conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 font-sans antialiased">
      <div className={`w-full max-w-[750px] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] transition-all duration-500 ${error ? 'animate-shake' : ''}`}>
        
        {/* Left side */}
        <div className="flex-[1.2] p-8 md:p-12 border-r border-slate-50 flex flex-col justify-center bg-white relative z-10">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-2 h-8 bg-emerald-500 rounded-full" />
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">AL <span className="text-emerald-500 italic">Security</span></h1>
          </div>

          {step !== 'success' ? (
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl flex items-center gap-2 animate-in fade-in duration-300">
                  <AlertCircle className="text-red-500" size={16} />
                  <p className="text-red-700 text-[10px] font-black uppercase tracking-tight">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">CNPJ Empresa</label>
                  <div className={`relative transition-all ${step === 'token' ? 'opacity-40 scale-[0.98]' : ''}`}>
                    <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-slate-300'}`} size={18} />
                    <input
                      type="text" disabled={step === 'token' || loading} value={cnpj}
                      onChange={(e) => handleCnpjChange(e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className={`w-full pl-11 pr-4 py-4 border rounded-2xl outline-none transition-all font-bold text-sm
                        ${error ? 'border-red-200 bg-red-50/30 text-red-900' : 'bg-slate-50 border-slate-100 focus:border-emerald-500 focus:bg-white text-slate-700'}`}
                    />
                  </div>
                </div>

                {step === 'token' && (
                  <div className="space-y-3 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Token</label>
                      <button onClick={() => {setStep('cnpj'); setToken(''); setError(null);}} className="text-[10px] font-black text-slate-400 hover:text-slate-800 underline uppercase">Editar</button>
                    </div>
                    <div className="relative flex justify-between gap-1.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`flex-1 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all ${token.length === i ? 'border-emerald-500 bg-white ring-2 ring-emerald-50' : 'border-slate-100 bg-slate-50 text-slate-300'} ${token[i] ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : ''}`}>
                          {token[i] || ""}
                        </div>
                      ))}
                      <input type="text" maxLength={6} value={token} autoFocus onChange={(e) => { setToken(e.target.value.replace(/\D/g, '')); }} className="absolute inset-0 opacity-0 cursor-default" />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={loading || (step === 'cnpj' ? cnpj.length < 14 : token.length < 6)}
                className="w-full py-5 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-[11px] tracking-[0.3em] uppercase transition-all shadow-xl active:scale-95 disabled:bg-slate-100"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : (
                  <div className="flex items-center justify-center gap-2">
                    {step === 'cnpj' ? 'Validar Acesso' : 'Entrar no Sistema'}
                    <ArrowRight size={16} />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center animate-in zoom-in-95 duration-700">
              <div className="mb-4 bg-emerald-50 w-fit p-3 rounded-2xl"><CheckCircle2 className="text-emerald-500" size={32} /></div>
              <h2 className="text-5xl font-black text-slate-800 tracking-tighter italic uppercase mb-2">Sucesso!</h2>
              <p className="text-slate-400 font-bold text-sm mb-10 leading-relaxed uppercase tracking-tight">Login efetuado com segurança.</p>
              <button onClick={() => {setStep('cnpj'); setCnpj(''); setToken(''); setError(null);}} className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em] mt-auto">
                <LogOut size={16} /> Encerrar Sessão
              </button>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className={`flex-1 flex items-center justify-center p-12 relative transition-all duration-1000 ${step === 'success' ? 'bg-emerald-50/50' : 'bg-slate-50'}`}>
          <div className="relative w-full max-w-[220px] transition-all duration-700">
            <svg viewBox="0 0 200 200" className="w-full h-auto drop-shadow-2xl animate-float">
              {/* Body */}
              <path 
                d="M40,100 Q40,30 100,30 Q160,30 160,100 Q160,140 100,140 Q40,140 40,100" 
                fill={error ? "#94A3B8" : step === 'success' ? "#059669" : "#10B981"} 
                className="transition-colors duration-500" 
              />
              
              {/* Tentacles */}
              <g className="tentacles">
                {[ 
                  "M50,130 Q20,130 30,160", "M75,140 Q60,175 80,185", "M100,142 Q100,185 115,185", 
                  "M125,140 Q140,175 120,185", "M150,130 Q180,130 170,160" 
                ].map((d, i) => (
                  <path key={i} d={d} stroke={error ? "#94A3B8" : step === 'success' ? "#059669" : "#10B981"} strokeWidth="12" fill="none" strokeLinecap="round" className={`t${i+1} transition-colors duration-500`} />
                ))}
              </g>

              {/* Eyes */}
              <g className="eyes-group">
                {/* Left side eyes */}
                <g className="animate-blink-eye" style={{ transformOrigin: '75px 85px' }}>
                  <circle cx="75" cy="85" r="22" fill="white" />
                  <circle cx="75" cy={error ? "95" : "85"} r="10" fill="black" className="transition-all duration-300" />
                </g>
                {/* Right side eyes */}
                <g className="animate-blink-eye" style={{ transformOrigin: '125px 85px' }}>
                  <circle cx="125" cy="85" r="22" fill="white" />
                  <circle cx="125" cy={error ? "95" : "85"} r="10" fill="black" className="transition-all duration-300" />
                </g>
              </g>
              
              {/* Mouth */}
              <path 
                d={error ? "M85,120 Q100,110 115,120" : step === 'success' ? "M80,115 Q100,140 120,115" : "M85,115 Q100,125 115,115"} 
                stroke="#1F2937" strokeWidth="4" fill="none" strokeLinecap="round" className="transition-all duration-300"
              />
            </svg>

            {/* speech bubble */}
            <div className={`absolute -top-10 -right-4 bg-white px-4 py-2 rounded-2xl shadow-xl border transition-all duration-500 transform ${error || step === 'success' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
              <span className="text-[10px] font-black uppercase text-slate-700 tracking-tighter">
                {error ? "Ops! CNPJ Errado" : "Acesso Ok! 🚀"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        
        @keyframes blink-eye { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0); } }
        .animate-blink-eye { animation: blink-eye 4s infinite; }

        @keyframes tentacle-swing { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(8deg); } }
        .tentacles path { transform-origin: top center; animation: tentacle-swing 3s ease-in-out infinite; }
        .t2 { animation-delay: 0.3s; } .t3 { animation-delay: 0.6s; } .t4 { animation-delay: 0.9s; } .t5 { animation-delay: 1.2s; }

        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.15s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}