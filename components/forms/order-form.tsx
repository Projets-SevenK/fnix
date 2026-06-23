'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { orderSchema, type OrderFormValues } from '@/lib/validations/order';
import { submitOrder } from '@/app/commande/actions';
import Button from '@/components/ui/button';

const inputClasses =
  'w-full bg-[#0c0c0f] border border-white/[0.08] text-[#f4f4f3] rounded-[6px] px-4 py-3 text-sm transition-colors placeholder:text-[#5a5a60] focus:outline-none focus:border-[#1183E6] focus:bg-[#0e0e12]';

const labelClasses =
  'block font-[family-name:var(--font-archivo)] text-[13px] font-medium text-[#cfcfd4] mb-[6px]';

const errorClasses = 'mt-1 text-[12px] text-[#ff6b6b]';

interface FieldErrorProps {
  message?: string;
}

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return <p className={errorClasses}>{message}</p>;
}

export default function OrderForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  async function onSubmit(formData: OrderFormValues) {
    setSubmitError(null);

    const result = await submitOrder(formData);

    if ('error' in result) {
      setSubmitError(result.error);
      return;
    }

    router.push(`/commande/confirmation?ref=${encodeURIComponent(result.reference)}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="customer_first_name" className={labelClasses}>
            Prénom <span className="text-[#ff6b6b]">*</span>
          </label>
          <input
            id="customer_first_name"
            type="text"
            autoComplete="given-name"
            placeholder="Jordan"
            className={inputClasses}
            {...register('customer_first_name')}
          />
          <FieldError message={errors.customer_first_name?.message} />
        </div>

        <div>
          <label htmlFor="customer_last_name" className={labelClasses}>
            Nom <span className="text-[#ff6b6b]">*</span>
          </label>
          <input
            id="customer_last_name"
            type="text"
            autoComplete="family-name"
            placeholder="Mbappé"
            className={inputClasses}
            {...register('customer_last_name')}
          />
          <FieldError message={errors.customer_last_name?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="customer_email" className={labelClasses}>
          Adresse e-mail <span className="text-[#ff6b6b]">*</span>
        </label>
        <input
          id="customer_email"
          type="email"
          autoComplete="email"
          placeholder="jordan@exemple.fr"
          className={inputClasses}
          {...register('customer_email')}
        />
        <FieldError message={errors.customer_email?.message} />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="customer_phone" className={labelClasses}>
          Téléphone <span className="text-[#ff6b6b]">*</span>
        </label>
        <input
          id="customer_phone"
          type="tel"
          autoComplete="tel"
          placeholder="0612345678"
          className={inputClasses}
          {...register('customer_phone')}
        />
        <FieldError message={errors.customer_phone?.message} />
      </div>

      {/* Adresse de livraison */}
      <div>
        <label htmlFor="shipping_address" className={labelClasses}>
          Adresse de livraison <span className="text-[#ff6b6b]">*</span>
        </label>
        <textarea
          id="shipping_address"
          rows={3}
          autoComplete="street-address"
          placeholder="12 rue des Lilas, 75011 Paris"
          className={`${inputClasses} resize-none`}
          {...register('shipping_address')}
        />
        <FieldError message={errors.shipping_address?.message} />
      </div>

      {/* Produit — lecture seule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Taille</label>
          <div
            aria-readonly="true"
            className="w-full bg-[#0a0a0d] border border-white/[0.05] text-[#86868c] rounded-[6px] px-4 py-3 text-sm select-none"
          >
            M
          </div>
        </div>

        <div>
          <label className={labelClasses}>Quantité</label>
          <div
            aria-readonly="true"
            className="w-full bg-[#0a0a0d] border border-white/[0.05] text-[#86868c] rounded-[6px] px-4 py-3 text-sm select-none"
          >
            1
          </div>
          {/* Hidden field so the value is part of the form data */}
          <input type="hidden" {...register('quantity', { valueAsNumber: true })} />
        </div>
      </div>

      {/* Note optionnelle */}
      <div>
        <label htmlFor="customer_note" className={labelClasses}>
          Note{' '}
          <span className="text-[#86868c] font-normal">(optionnelle)</span>
        </label>
        <textarea
          id="customer_note"
          rows={3}
          maxLength={500}
          placeholder="Informations complémentaires pour la livraison..."
          className={`${inputClasses} resize-none`}
          {...register('customer_note')}
        />
        <FieldError message={errors.customer_note?.message} />
      </div>

      {/* Submit */}
      <div className="pt-2 flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Passer ma commande'}
        </Button>

        {submitError !== null && (
          <p
            role="alert"
            className="font-[family-name:var(--font-archivo)] text-sm text-[#ff6b6b]"
          >
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
