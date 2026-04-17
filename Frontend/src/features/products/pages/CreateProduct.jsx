import React, { useState } from 'react';
import { useProduct } from '../hook/useProduct';

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
        images: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 7) {
            setError("You can only upload up to 7 images.");
            return;
        }
        setError(null);
        setFormValues(prev => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (formValues.images.length === 0) {
            setError("Please upload at least one image.");
            return;
        }
        if (formValues.images.length > 7) {
            setError("You can only upload up to 7 images.");
            return;
        }

        const data = new FormData();
        data.append('title', formValues.title);
        data.append('description', formValues.description);
        data.append('priceAmount', formValues.priceAmount);
        data.append('priceCurrency', formValues.priceCurrency);
        formValues.images.forEach(img => {
            data.append('images', img);
        });

        try {
            setLoading(true);
            await handleCreateProduct(data);
            setSuccess(true);
            setFormValues({ title: '', description: '', priceAmount: '', priceCurrency: 'INR', images: [] });
            // Reset file input manually if needed
            document.getElementById('image-upload').value = '';
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-['Inter'] flex justify-center py-12 px-6 sm:px-12">
            <div className="w-full max-w-6xl">
                
                {/* Header Section */}
                <div className="mb-16 border-b border-[#353534] pb-8 pt-8">
                    <h1 className="text-4xl sm:text-5xl font-['Manrope'] font-medium text-white tracking-tight mb-4">
                        New Listing
                    </h1>
                    <p className="text-[#d0c6ab] text-lg font-light">
                        Add a new piece to the exclusive After Raven collection.
                    </p>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mb-8 p-4 bg-[#93000a] text-[#ffdad6] rounded-xl text-sm font-medium border border-[#690005]">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-8 p-4 bg-[#004f54] text-[#defcff] rounded-xl text-sm font-medium border border-[#006a70]">
                        Listing successfully created!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Column: Details & Pricing */}
                    <div className="flex flex-col gap-10 lg:w-7/12">
                        
                        {/* Basic Info Section */}
                        <div className="flex flex-col gap-6 p-8 sm:p-10 bg-[#1c1b1b] rounded-2xl border border-transparent hover:border-[#353534] transition-all">
                            <div className="flex flex-col gap-2">
                                <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Product Title</label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Obsidian Trench Coat"
                                    className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-7 py-5 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 placeholder:text-[#d0c6ab]/30 transition-all text-base"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Description</label>
                                <textarea 
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="5"
                                    placeholder="Describe the materials, fit, and essence of the piece..."
                                    className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-7 py-5 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 placeholder:text-[#d0c6ab]/30 transition-all text-base resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="flex flex-col gap-6 p-8 sm:p-10 bg-[#1c1b1b] rounded-2xl border border-transparent hover:border-[#353534] transition-all">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Price Amount</label>
                                    <input 
                                        type="number" 
                                        name="priceAmount"
                                        value={formValues.priceAmount}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-7 py-5 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 placeholder:text-[#d0c6ab]/30 transition-all text-base"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Currency</label>
                                    <select 
                                        name="priceCurrency"
                                        value={formValues.priceCurrency}
                                        onChange={handleInputChange}
                                        className="bg-[#0e0e0e] text-[#e5e2e1] border border-transparent rounded-xl px-7 py-5 focus:outline-none focus:border-[#FFD700]/30 focus:bg-[#131313] focus:ring-1 focus:ring-[#FFD700]/50 outline-none transition-all text-base appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999077%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "10px auto" }}
                                    >
                                        <option value="INR">INR - Indian Rupee</option>
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="EUR">EUR - Euro</option>
                                        <option value="GBP">GBP - British Pound</option>
                                        <option value="JYP">JYP - Japanese Yen</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Media Upload & Actions */}
                    <div className="flex flex-col gap-10 lg:w-5/12">
                        
                        {/* Media Upload Section */}
                        <div className="flex flex-col gap-6 p-8 sm:p-10 bg-[#1c1b1b] rounded-2xl border border-transparent hover:border-[#353534] transition-all flex-grow">
                            <div className="flex flex-col gap-2 h-full">
                                <label className="uppercase tracking-widest text-xs font-bold text-[#999077]">Media Gallery</label>
                                <div className="relative group cursor-pointer mt-2 flex-grow flex flex-col">
                                    <input 
                                        type="file" 
                                        id="image-upload"
                                        name="images"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`flex flex-col items-center justify-center border border-dashed rounded-xl py-16 px-4 transition-all duration-300 flex-grow ${formValues.images.length > 0 && formValues.images.length <= 7 ? 'border-[#FFD700]/50 bg-[#FFD700]/5' : 'border-[#4d4732] bg-[#0e0e0e] group-hover:border-[#FFD700]/30 group-hover:bg-[#131313]'}`}>
                                        <svg className="w-10 h-10 text-[#999077] mb-4 group-hover:text-[#FFD700] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <div className="text-center">
                                            {formValues.images.length > 0 ? (
                                                <span className="text-[#FFD700] font-medium block mb-1">{formValues.images.length} file(s) selected</span>
                                            ) : (
                                                <span className="text-[#d0c6ab] font-medium block mb-1 group-hover:text-white transition-colors">Click or drag images to upload</span>
                                            )}
                                            <span className="text-xs text-[#999077]">JPG, PNG, WEBP. Up to 7 images.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pb-12">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-br from-[#e9c400] to-[#FFD700] text-[#3a3000] rounded-xl px-12 py-5 font-bold text-lg transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                            >
                                {loading ? 'Publishing...' : 'Post Listing'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;