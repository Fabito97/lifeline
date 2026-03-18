import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/Input';
import { authService } from '../../../api/services';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [hasPreview, setHasPreview] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        try {
            const response = await authService.forgotPassword(email);
            if (response?.success) {
                setMessage(response.message);
                const preview = response?.data?.emailPreview;
                if (preview?.html) {
                    sessionStorage.setItem('emailPreviewHtml', preview.html);
                    sessionStorage.setItem('emailPreviewType', 'reset');
                    setHasPreview(true);
                }
                if (preview?.resetUrl) {
                    sessionStorage.setItem('emailPreviewActionUrl', preview.resetUrl);
                    sessionStorage.setItem('emailPreviewActionLabel', 'Open Reset Link');
                }
            } else {
                setError(response?.message || 'Unable to send reset email.');
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Unable to send reset email.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-lg">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-2 italic">Key Search</h2>
                <p className="text-slate-500 italic">Lost your key to the kingdom? No worries, we'll help you back in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    />
                    {hasPreview && (
                        <Link
                            to="/email-preview"
                            className="block w-full text-center py-4 mt-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all"
                        >
                            View Reset Email
                        </Link>
                    )}

                {message && (
                    <div className="text-sm text-emerald-600 font-semibold">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="text-sm text-rose-600 font-semibold">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/60 transform hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                    {isSubmitting ? 'Sending...' : 'Send Recovery Link'}
                </button>
            </form>


            <p className="mt-12 text-center text-sm text-slate-400">
                Wait, I remember it!{' '}
                <Link to="/" className="text-blue-600 font-bold hover:underline">
                    Take me back
                </Link>
            </p>
        </div>
    );
};

export default ForgotPasswordForm;
