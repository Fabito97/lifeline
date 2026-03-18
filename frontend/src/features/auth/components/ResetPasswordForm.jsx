import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../../components/Input';
import { authService } from '../../../api/services';

const ResetPasswordForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Missing or invalid reset token.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await authService.resetPassword(
                token,
                formData.password,
                formData.confirmPassword
            );
            if (response?.success) {
                navigate('/password-confirmed');
            } else {
                setError(response?.message || 'Failed to reset password.');
            }
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Failed to reset password.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-lg">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-2 italic">Fresh Start</h2>
                <p className="text-slate-500 italic">Time for a new anchor. Make it strong, like your faith.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="New Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                />
                <Input
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                />

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
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
