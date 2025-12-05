import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/ui/input.js';
import { Button } from '../components/ui/button.js';
import { signup } from '../lib/api.js';
import { useNavigate, Link } from 'react-router-dom';
import { Apple, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
});

type FormValues = z.infer<typeof schema>;

export function SignUpPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      const { token } = await signup(values);
      localStorage.setItem('token', token);
      navigate('/products');
    } catch (err: any) {
      alert(err?.response?.data?.message ?? 'Sign up failed');
    }
  }

  return (
    <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border bg-white">
      <div className="bg-black text-white p-10 flex flex-col justify-between min-h-[50vh] md:min-h-[80vh]">
        <div className="flex items-center justify-start">
          <div className="w-9 h-9 rounded-xl bg-white/90" />
        </div>
        <div className="space-y-4">
          <div className="text-3xl md:text-4xl font-bold">Just Do It</div>
          <p className="text-neutral-300">Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.</p>
          <div className="flex gap-2"> <span className="w-2 h-2 bg-white rounded-full"/> <span className="w-2 h-2 bg-neutral-500 rounded-full"/> <span className="w-2 h-2 bg-neutral-500 rounded-full"/> </div>
        </div>
        <div className="text-xs text-neutral-500 mt-8">© 2024 Nike. All rights reserved.</div>
      </div>
      <div className="p-8 md:p-12 space-y-6">
        <div className="text-right text-sm">Already have an account? <Link to="#" className="underline">Sign In</Link></div>
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">Join Nike Today!</h1>
          <p className="text-sm text-neutral-600">Create your account to start your fitness journey</p>
        </div>

        <div className="space-y-3">
          <button type="button" className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3">
            <ShieldCheck className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3">
            <Apple className="w-5 h-5" />
            <span>Continue with Apple</span>
          </button>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <div className="h-px bg-neutral-200 flex-1" />
            <span>Or sign up with</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm">Full Name</label>
            <Input placeholder="Enter your full name" {...register('name')} />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>
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
          <Button type="submit" disabled={isSubmitting} className="w-full">Sign Up</Button>
          <p className="text-xs text-neutral-500">By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a></p>
        </form>
      </div>
    </div>
  );
}
