import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/ui/input.js';
import { Button } from '../components/ui/button.js';
import { signin } from '../lib/api.js';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
});

type FormValues = z.infer<typeof schema>;

export function SignInPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      const { token } = await signin(values);
      localStorage.setItem('token', token);
      navigate('/products');
    } catch (err: any) {
      alert(err?.response?.data?.message ?? 'Sign in failed');
    }
  }

  return (
    <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border bg-white">
      <div className="bg-black text-white p-10 flex flex-col justify-between min-h-[50vh] md:min-h-[80vh]">
        <div className="flex items-center justify-start">
          <img src="/nike.webp" alt="Logo" className="h-9 object-contain" />
        </div>
        <div className="space-y-4">
          <div className="text-3xl md:text-4xl font-bold">Welcome Back</div>
          <p className="text-neutral-300">Access your account and keep your training on track.</p>
        </div>
        <div className="text-xs text-neutral-500 mt-8">© 2024 Nike. All rights reserved.</div>
      </div>
      <div className="p-8 md:p-12 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">Sign In</h1>
          <p className="text-sm text-neutral-600">Use your email and password</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm">Email</label>
            <Input placeholder="johndoe@gmail.com" type="email" {...register('email')} />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm">Password</label>
            <div className="relative">
              <Input placeholder="minimum 8 characters" type={showPassword ? 'text' : 'password'} {...register('password')} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">Sign In</Button>
          <div className="text-sm">Don't have an account? <Link to="/signup" className="underline">Sign Up</Link></div>
        </form>
      </div>
    </div>
  );
}
