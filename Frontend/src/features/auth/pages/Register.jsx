import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';

export default function Register() {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        contact: '',
        email: '',
        password: '',
        isSeller: false,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await handleRegister(formData);
            // On success, redirect to home or login
            navigate('/');
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Failed to register');
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
                        Redefining<br />modern elegance.
                    </h2>
                    <p className="text-[#d0c6ab] text-xl max-w-md font-light leading-relaxed">
                        Join our exclusive fashion platform. Curated collections for the modern minimalist.
                    </p>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative">

                {/* Subtle glow for mobile/tablet behind the form */}
                <div className="absolute inset-0 flex items-center justify-center lg:hidden pointer-events-none">
                    <div className="w-full max-w-xl h-96 bg-[#FFD700] blur-[150px] opacity-[0.03] rounded-full"></div>
                </div>

                <div className="w-full max-w-lg bg-[#201f1f] lg:bg-transparent lg:shadow-none rounded-2xl p-10 sm:p-14 lg:p-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10">

                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl text-[#FFD700] mb-4 tracking-tight font-['Manrope'] font-medium">Join After Raven</h1>
                        <p className="text-[#d0c6ab] text-lg lg:text-base">Your exclusive destination for premium clothing.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-[#93000a] text-[#ffdad6] rounded-xl text-sm font-medium border border-[#690005]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="flex flex-col gap-6">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-5 py-4 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 placeholder:text-[#d0c6ab]/30 transition-all text-base"
                            />
                        </div>

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

                        {/* Contact Number */}
                        <div className="flex flex-col gap-2">
                            <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Contact Number</label>
                            <input
                                type="tel"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                                placeholder="1234567890"
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

                        {/* Checkbox */}
                        <div className="flex items-center gap-4 mt-2 mb-4 group cursor-pointer" onClick={() => handleChange({ target: { name: 'isSeller', type: 'checkbox', checked: !formData.isSeller } })}>
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    name="isSeller"
                                    checked={formData.isSeller}
                                    readOnly
                                    className="peer appearance-none w-6 h-6 border-2 border-[#4d4732] rounded bg-[#0e0e0e] group-hover:border-[#FFD700]/50 checked:bg-[#FFD700] checked:border-transparent transition-all"
                                />
                                <svg className="absolute w-4 h-4 text-[#3a3000] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <label className="text-[#d0c6ab] text-base select-none group-hover:text-white transition-colors">
                                Register as a seller
                            </label>


                        </div>

                        <ContinueWithGoogle />
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-gradient-to-br from-[#e9c400] to-[#FFD700] text-[#3a3000] rounded-xl px-8 py-5 font-bold text-lg transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                        >
                            {loading ? 'Entering the vault...' : 'Create Account'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
