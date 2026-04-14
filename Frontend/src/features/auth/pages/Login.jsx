import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate, Link } from 'react-router';

export default function Login() {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await handleLogin(formData);
            navigate('/');
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-[#e5e2e1] font-['Inter'] bg-[#131313]">
            
            {/* Left Side: Editorial Branding (Visible only on desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-b from-[#1c1b1b] to-[#0e0e0e] p-20 flex-col justify-between border-r border-[#353534]">
                {/* Abstract lighting effects */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FFD700] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#93000a] rounded-full blur-[250px] opacity-10 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="text-[#FFD700] font-['Manrope'] text-3xl font-bold tracking-widest uppercase mb-2">After Raven</div>
                    <div className="h-1 w-12 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
                </div>

                <div className="relative z-10">
                    <h2 className="text-5xl xl:text-6xl text-white mb-6 tracking-tight font-['Manrope'] font-medium leading-tight">
                        Welcome<br/>back.
                    </h2>
                    <p className="text-[#d0c6ab] text-xl max-w-md font-light leading-relaxed">
                        Access your exclusive fashion platform and explore the latest curated collections.
                    </p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative">
                
                {/* Subtle glow for mobile/tablet behind the form */}
                <div className="absolute inset-0 flex items-center justify-center lg:hidden pointer-events-none">
                    <div className="w-full max-w-xl h-96 bg-[#FFD700] blur-[150px] opacity-[0.03] rounded-full"></div>
                </div>

                <div className="w-full max-w-lg bg-[#201f1f] lg:bg-transparent lg:shadow-none rounded-2xl p-10 sm:p-14 lg:p-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10">
                    
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl text-[#FFD700] mb-4 tracking-tight font-['Manrope'] font-medium">Log In</h1>
                        <p className="text-[#d0c6ab] text-lg lg:text-base">Enter your credentials to access the vault.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-[#93000a] text-[#ffdad6] rounded-xl text-sm font-medium border border-[#690005]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="flex flex-col gap-6">

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                                className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 placeholder:text-[#d0c6ab]/30 transition-all text-base"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 placeholder:text-[#d0c6ab]/30 transition-all text-base"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="mt-6 bg-gradient-to-br from-[#e9c400] to-[#FFD700] text-[#3a3000] rounded-xl px-8 py-5 font-bold text-lg transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                        
                    </form>

                    <div className="mt-8 text-[#d0c6ab] text-sm text-center lg:text-left">
                        Don't have an account? <Link to="/register" className="text-[#FFD700] hover:underline font-bold">Apply here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
