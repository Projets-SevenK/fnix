'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { AdminSettings, ProductStock } from '@/types/database';
import { updateSettings, uploadProductImage, adjustStock, updateInitialStock } from '@/app/admin/produit/actions';

interface ProductSettingsFormProps {
  settings: AdminSettings;
  stock: ProductStock | null;
}

type FeedbackState = { success: boolean; message: string } | null;

const sectionStyle: React.CSSProperties = {
  background: '#0c0c0f',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '1.5rem',
  marginBottom: '1.5rem',
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-space-mono), monospace',
  fontSize: '0.65rem',
  color: '#86868c',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '1.25rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-space-mono), monospace',
  fontSize: '0.65rem',
  color: '#86868c',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '0.4rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#060608',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f4f4f3',
  fontFamily: 'var(--font-archivo), sans-serif',
  fontSize: '0.9rem',
  padding: '0.6rem 0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const saveButtonStyle: React.CSSProperties = {
  marginTop: '1rem',
  background: '#1183E6',
  border: 'none',
  borderRadius: '6px',
  color: '#f4f4f3',
  fontFamily: 'var(--font-space-mono), monospace',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '0.6rem 1.25rem',
  cursor: 'pointer',
};

const disabledButtonStyle: React.CSSProperties = {
  ...saveButtonStyle,
  opacity: 0.5,
  cursor: 'not-allowed',
};

function FeedbackMessage({ feedback }: { feedback: FeedbackState }) {
  if (!feedback) return null;
  return (
    <p
      style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.06em',
        marginTop: '0.75rem',
        color: feedback.success ? '#22c55e' : '#ef4444',
      }}
    >
      {feedback.message}
    </p>
  );
}

export default function ProductSettingsForm({ settings, stock }: ProductSettingsFormProps) {
  const router = useRouter();

  // Section 1 — Drop status
  const [productStatus, setProductStatus] = useState<'available' | 'coming_soon' | 'sold_out'>(
    settings.product_status ?? 'available'
  );
  const [statusFeedback, setStatusFeedback] = useState<FeedbackState>(null);
  const [isPendingStatus, startStatusTransition] = useTransition();

  // Section 2 — Price, description, back message
  const [productPrice, setProductPrice] = useState<string>(
    String(settings.product_price ?? '44.00')
  );
  const [productDescription, setProductDescription] = useState<string>(
    settings.product_description ?? ''
  );
  const [productBackMessage, setProductBackMessage] = useState<string>(
    settings.product_back_message ?? ''
  );
  const [descFeedback, setDescFeedback] = useState<FeedbackState>(null);
  const [isPendingDesc, startDescTransition] = useTransition();

  // Section 3 — Product images (feedback per image slot)
  const [imageFeedbacks, setImageFeedbacks] = useState<Record<string, FeedbackState>>({});
  const [imageUrls, setImageUrls] = useState<Record<string, string | null>>({
    hero_image_url: settings.hero_image_url ?? null,
    product_image_main_url: settings.product_image_main_url ?? null,
    product_image_secondary_1_url: settings.product_image_secondary_1_url ?? null,
    product_image_secondary_2_url: settings.product_image_secondary_2_url ?? null,
  });
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Section 4 — Wero settings
  const [weroPhone, setWeroPhone] = useState<string>(settings.wero_phone ?? '');
  const [weroBeneficiary, setWeroBeneficiary] = useState<string>(
    settings.wero_beneficiary_name ?? ''
  );
  const [weroQrUrl, setWeroQrUrl] = useState<string>(settings.wero_qr_code_url ?? '');
  const [weroFeedback, setWeroFeedback] = useState<FeedbackState>(null);
  const [isPendingWero, startWeroTransition] = useTransition();

  // Section 5 — Stock
  const [initialStockValue, setInitialStockValue] = useState<number>(stock?.initial_stock ?? 7);
  const [stockValue, setStockValue] = useState<number>(stock?.remaining_stock ?? 0);
  const [stockFeedback, setStockFeedback] = useState<FeedbackState>(null);
  const [initialStockFeedback, setInitialStockFeedback] = useState<FeedbackState>(null);
  const [isPendingStock, startStockTransition] = useTransition();
  const [isPendingInitialStock, startInitialStockTransition] = useTransition();

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Handlers — Section 1
  function handleStatusSave() {
    startStatusTransition(async () => {
      setStatusFeedback(null);
      const result = await updateSettings({ product_status: productStatus });
      setStatusFeedback(
        result.success
          ? { success: true, message: 'Statut mis à jour.' }
          : { success: false, message: result.error ?? 'Erreur inconnue.' }
      );
      if (result.success) router.refresh();
    });
  }

  // Handlers — Section 2
  function handleDescSave() {
    const price = parseFloat(productPrice);
    if (isNaN(price) || price < 0) {
      setDescFeedback({ success: false, message: 'Prix invalide.' });
      return;
    }
    startDescTransition(async () => {
      setDescFeedback(null);
      const result = await updateSettings({
        product_price: price,
        product_description: productDescription || null,
        product_back_message: productBackMessage || null,
      });
      setDescFeedback(
        result.success
          ? { success: true, message: 'Prix, description et message dos mis à jour.' }
          : { success: false, message: result.error ?? 'Erreur inconnue.' }
      );
      if (result.success) router.refresh();
    });
  }

  // Handlers — Section 3
  async function handleImageUpload(imageField: string, file: File) {
    setUploadingField(imageField);
    setImageFeedbacks((prev) => ({ ...prev, [imageField]: null }));
    const fd = new FormData();
    fd.append('file', file);
    const result = await uploadProductImage(fd, imageField);
    setUploadingField(null);
    setImageFeedbacks((prev) => ({
      ...prev,
      [imageField]: result.success
        ? { success: true, message: 'Photo mise à jour.' }
        : { success: false, message: result.error ?? 'Erreur lors de l\'upload.' },
    }));
    if (result.success && result.url) {
      setImageUrls((prev) => ({ ...prev, [imageField]: result.url! }));
      router.refresh();
    }
  }

  function handleFileChange(imageField: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      void handleImageUpload(imageField, file);
    }
  }

  // Handlers — Section 4
  function handleWeroSave() {
    startWeroTransition(async () => {
      setWeroFeedback(null);
      const result = await updateSettings({
        wero_phone: weroPhone,
        wero_beneficiary_name: weroBeneficiary || null,
        wero_qr_code_url: weroQrUrl || null,
      });
      setWeroFeedback(
        result.success
          ? { success: true, message: 'Paramètres Wero mis à jour.' }
          : { success: false, message: result.error ?? 'Erreur inconnue.' }
      );
      if (result.success) router.refresh();
    });
  }

  // Handlers — Section 5
  function handleInitialStockUpdate() {
    const confirmed = window.confirm(
      `Définir le stock total à ${initialStockValue} pièce(s) ?\n\nSi le stock restant est supérieur à cette valeur, il sera automatiquement réduit.`
    );
    if (!confirmed) return;
    startInitialStockTransition(async () => {
      setInitialStockFeedback(null);
      const result = await updateInitialStock(initialStockValue);
      setInitialStockFeedback(
        result.success
          ? { success: true, message: `Stock total défini à ${initialStockValue} pièce(s).` }
          : { success: false, message: result.error ?? 'Erreur inconnue.' }
      );
      if (result.success) router.refresh();
    });
  }

  function handleStockAdjust() {
    const confirmed = window.confirm(
      `Confirmer l'ajustement du stock à ${stockValue} pièce(s) ?\n\nCette action modifie directement le stock. La règle de décrémentation automatique reste active.`
    );
    if (!confirmed) return;
    startStockTransition(async () => {
      setStockFeedback(null);
      const result = await adjustStock(stockValue);
      setStockFeedback(
        result.success
          ? { success: true, message: `Stock ajusté à ${stockValue} pièce(s).` }
          : { success: false, message: result.error ?? 'Erreur inconnue.' }
      );
      if (result.success) router.refresh();
    });
  }

  const imageSlots: Array<{ field: string; label: string }> = [
    { field: 'hero_image_url', label: 'Photo hero' },
    { field: 'product_image_main_url', label: 'Photo principale produit' },
    { field: 'product_image_secondary_1_url', label: 'Photo secondaire 1' },
    { field: 'product_image_secondary_2_url', label: 'Photo secondaire 2' },
  ];

  const radioOptions: Array<{
    value: 'available' | 'coming_soon' | 'sold_out';
    label: string;
  }> = [
    { value: 'available', label: 'Disponible' },
    { value: 'coming_soon', label: 'Bientôt disponible' },
    { value: 'sold_out', label: 'Épuisé' },
  ];

  return (
    <div>
      {/* Section 1 — Drop status */}
      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Statut du drop</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {radioOptions.map((opt) => {
            const active = productStatus === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setProductStatus(opt.value)}
                style={{
                  background: active ? '#1183E6' : 'transparent',
                  border: active ? '1px solid #1183E6' : '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  color: active ? '#f4f4f3' : '#9a9aa0',
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleStatusSave}
          disabled={isPendingStatus}
          style={isPendingStatus ? disabledButtonStyle : saveButtonStyle}
        >
          {isPendingStatus ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <FeedbackMessage feedback={statusFeedback} />
      </div>

      {/* Section 2 — Price and description */}
      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Prix et description</p>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle} htmlFor="product-price">
            Prix (€)
          </label>
          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="product-description">
            Description produit
          </label>
          <textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={4}
            style={{
              ...inputStyle,
              resize: 'vertical',
              fontFamily: 'var(--font-archivo), sans-serif',
            }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label style={labelStyle} htmlFor="product-back-message">
            Message au dos du t-shirt
          </label>
          <input
            id="product-back-message"
            type="text"
            value={productBackMessage}
            onChange={(e) => setProductBackMessage(e.target.value)}
            placeholder="ex: Respect. Ambition. Évolution."
            style={inputStyle}
          />
        </div>
        <button
          onClick={handleDescSave}
          disabled={isPendingDesc}
          style={isPendingDesc ? disabledButtonStyle : saveButtonStyle}
        >
          {isPendingDesc ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <FeedbackMessage feedback={descFeedback} />
      </div>

      {/* Section 3 — Product images */}
      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Photos produit</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {imageSlots.map(({ field, label }) => {
            const currentUrl = imageUrls[field];
            const isUploading = uploadingField === field;
            return (
              <div key={field}>
                <p style={{ ...labelStyle, marginBottom: '0.6rem' }}>{label}</p>
                {currentUrl ? (
                  <div style={{ position: 'relative' }}>
                    <Image
                      src={currentUrl}
                      alt={label}
                      width={200}
                      height={150}
                      unoptimized
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'block',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[field]?.click()}
                      disabled={isUploading}
                      style={{
                        marginTop: '0.5rem',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#9a9aa0',
                        fontFamily: 'var(--font-space-mono), monospace',
                        fontSize: '0.65rem',
                        letterSpacing: '0.06em',
                        padding: '0.35rem 0.75rem',
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        width: '100%',
                      }}
                    >
                      {isUploading ? 'Upload...' : 'Remplacer'}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[field]?.click()}
                    disabled={isUploading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '150px',
                      background:
                        'repeating-linear-gradient(135deg, #0d0d10 0, #0d0d10 11px, #131318 11px, #131318 22px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      color: '#56565c',
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isUploading ? 'Upload...' : 'Choisir une photo'}
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={(el) => {
                    fileInputRefs.current[field] = el;
                  }}
                  onChange={(e) => handleFileChange(field, e)}
                />
                <FeedbackMessage feedback={imageFeedbacks[field] ?? null} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4 — Wero settings */}
      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Paramètres Wero</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle} htmlFor="wero-phone">
              Numéro Wero
            </label>
            <input
              id="wero-phone"
              type="text"
              value={weroPhone}
              onChange={(e) => setWeroPhone(e.target.value)}
              placeholder="06 XX XX XX XX"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="wero-beneficiary">
              Nom bénéficiaire
            </label>
            <input
              id="wero-beneficiary"
              type="text"
              value={weroBeneficiary}
              onChange={(e) => setWeroBeneficiary(e.target.value)}
              placeholder="Prénom Nom"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="wero-qr">
              URL QR code Wero
            </label>
            <input
              id="wero-qr"
              type="url"
              value={weroQrUrl}
              onChange={(e) => setWeroQrUrl(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>
        </div>
        <button
          onClick={handleWeroSave}
          disabled={isPendingWero}
          style={isPendingWero ? disabledButtonStyle : saveButtonStyle}
        >
          {isPendingWero ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <FeedbackMessage feedback={weroFeedback} />
      </div>

      {/* Section 5 — Stock */}
      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Stock</p>
        <p
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: '1.6rem',
            letterSpacing: '0.02em',
            margin: '0 0 1.5rem',
            color:
              (stock?.remaining_stock ?? 0) === 0
                ? '#ef4444'
                : (stock?.remaining_stock ?? 0) <= 2
                  ? '#fb923c'
                  : '#22c55e',
          }}
        >
          {stock?.remaining_stock ?? '—'}
          <span
            style={{
              fontSize: '1rem',
              color: '#cfcfd4',
              fontFamily: 'var(--font-archivo), sans-serif',
            }}
          >
            {' '}/ {initialStockValue} pièces
          </span>
        </p>

        {/* Stock total (initial) */}
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <label style={labelStyle} htmlFor="initial-stock-value">
            Stock total (pièces commandées au fournisseur)
          </label>
          <input
            id="initial-stock-value"
            type="number"
            min={1}
            value={initialStockValue}
            onChange={(e) => setInitialStockValue(Number(e.target.value))}
            style={{ ...inputStyle, maxWidth: '120px' }}
          />
          <button
            onClick={handleInitialStockUpdate}
            disabled={isPendingInitialStock}
            style={isPendingInitialStock ? { ...disabledButtonStyle, marginTop: '0.75rem' } : { ...saveButtonStyle, marginTop: '0.75rem' }}
          >
            {isPendingInitialStock ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <FeedbackMessage feedback={initialStockFeedback} />
        </div>

        {/* Stock restant (correction manuelle) */}
        <div>
          <label style={labelStyle} htmlFor="stock-value">
            Correction du stock restant (0 à {initialStockValue})
          </label>
          <input
            id="stock-value"
            type="number"
            min={0}
            max={initialStockValue}
            value={stockValue}
            onChange={(e) => setStockValue(Number(e.target.value))}
            style={{ ...inputStyle, maxWidth: '120px' }}
          />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontSize: '0.78rem',
            color: '#fb923c',
            background: 'rgba(251,146,60,0.08)',
            border: '1px solid rgba(251,146,60,0.2)',
            borderRadius: '6px',
            padding: '0.6rem 0.9rem',
            margin: '0.75rem 0',
          }}
        >
          Réservé aux corrections d&apos;erreur. La règle de décrémentation automatique reste active.
        </p>
        <button
          onClick={handleStockAdjust}
          disabled={isPendingStock}
          style={
            isPendingStock
              ? disabledButtonStyle
              : {
                  ...saveButtonStyle,
                  background: 'rgba(251,146,60,0.15)',
                  border: '1px solid rgba(251,146,60,0.4)',
                  color: '#fb923c',
                }
          }
        >
          {isPendingStock ? 'Ajustement...' : 'Ajuster le stock restant'}
        </button>
        <FeedbackMessage feedback={stockFeedback} />
      </div>
    </div>
  );
}
