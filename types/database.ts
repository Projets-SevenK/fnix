export type PaymentStatus = 'pending' | 'paid' | 'cancelled';
export type ShippingStatus = 'not_prepared' | 'prepared' | 'shipped';

export type Order = {
  id: string;
  reference: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  product_name: string;
  size: string;
  quantity: number;
  amount_expected: number;
  payment_status: PaymentStatus;
  shipping_status: ShippingStatus;
  tracking_number: string | null;
  customer_note: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductStock = {
  id: string;
  product_name: string;
  size: string;
  initial_stock: number;
  remaining_stock: number;
  is_available: boolean;
  updated_at: string;
};

export type AdminSettings = {
  id: string;
  wero_phone: string;
  wero_qr_code_url: string | null;
  product_price: number;
  shipping_price: number;
  instagram_url: string | null;
  updated_at: string;
  product_description: string | null;
  product_status: 'available' | 'coming_soon' | 'sold_out';
  wero_beneficiary_name: string | null;
  hero_image_url: string | null;
  product_image_main_url: string | null;
  product_image_secondary_1_url: string | null;
  product_image_secondary_2_url: string | null;
  product_back_message: string | null;
};
