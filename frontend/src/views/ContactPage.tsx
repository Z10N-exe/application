import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/ui/input.js';
import { Button } from '../components/ui/button.js';

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'At least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

export function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  function onSubmit(values: FormValues) {
    alert('Thanks! We will get back to you.');
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold">Contact</h1>
        <p className="text-neutral-600">Questions about sizing, orders, or our products? Send us a message.</p>
        <div className="text-sm">Email: support@example.com</div>
        <div className="text-sm">Phone: +1 (555) 123-4567</div>
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
          <label className="text-sm">Message</label>
          <textarea className="w-full rounded-md border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" rows={5} placeholder="Tell us more..." {...register('message')} />
          {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>Send</Button>
      </form>
    </div>
  );
}
