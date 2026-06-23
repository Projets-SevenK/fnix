-- ============================================================
-- FNIX Drop 044 — Migration SQL
-- À exécuter manuellement dans le Supabase SQL Editor.
-- Ne pas exécuter automatiquement.
-- ============================================================

-- Séquence pour les références de commande
CREATE SEQUENCE IF NOT EXISTS orders_seq START 1;

-- Table orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  customer_first_name text NOT NULL,
  customer_last_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  product_name text NOT NULL DEFAULT 'T-shirt FNIX Drop 044',
  size text NOT NULL DEFAULT 'M',
  quantity integer NOT NULL DEFAULT 1,
  amount_expected numeric(10,2) NOT NULL DEFAULT 44.00,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','cancelled')),
  shipping_status text NOT NULL DEFAULT 'not_prepared' CHECK (shipping_status IN ('not_prepared','prepared','shipped')),
  tracking_number text,
  customer_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ADD CONSTRAINT orders_reference_unique UNIQUE (reference);

-- Table product_stock
CREATE TABLE IF NOT EXISTS product_stock (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name text NOT NULL,
  size text NOT NULL,
  initial_stock integer NOT NULL DEFAULT 7,
  remaining_stock integer NOT NULL DEFAULT 7,
  is_available boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT stock_non_negative CHECK (remaining_stock >= 0)
);

-- Données initiales stock
INSERT INTO product_stock (product_name, size, initial_stock, remaining_stock, is_available)
VALUES ('T-shirt FNIX Drop 044', 'M', 7, 7, true)
ON CONFLICT DO NOTHING;

-- Table admin_settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wero_phone text NOT NULL DEFAULT '06 XX XX XX XX',
  wero_qr_code_url text,
  product_price numeric(10,2) NOT NULL DEFAULT 44.00,
  shipping_price numeric(10,2) NOT NULL DEFAULT 0.00,
  instagram_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Données initiales admin_settings
INSERT INTO admin_settings (wero_phone, product_price, shipping_price)
VALUES ('06 XX XX XX XX', 44.00, 0.00)
ON CONFLICT DO NOTHING;

-- RLS orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_insert_anon" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "orders_all_authenticated" ON orders FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS product_stock
ALTER TABLE product_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stock_select_public" ON product_stock FOR SELECT TO anon, authenticated USING (true);

-- RLS admin_settings
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_select_public" ON admin_settings FOR SELECT TO anon, authenticated USING (true);

-- RPC helper : récupérer la prochaine valeur de la séquence orders_seq
CREATE OR REPLACE FUNCTION get_next_order_seq()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT nextval('orders_seq');
$$;

-- RPC atomique : passer une commande en paid + décrémenter le stock
CREATE OR REPLACE FUNCTION mark_order_paid(p_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM orders
    WHERE id = p_order_id AND payment_status = 'pending'
  ) THEN
    RAISE EXCEPTION 'Order not found or not in pending status';
  END IF;

  UPDATE orders
    SET payment_status = 'paid', updated_at = now()
    WHERE id = p_order_id;

  UPDATE product_stock
    SET
      remaining_stock = GREATEST(remaining_stock - 1, 0),
      is_available = (remaining_stock - 1 > 0),
      updated_at = now()
    WHERE product_name = 'T-shirt FNIX Drop 044' AND size = 'M';
END;
$$;

-- ============================================================
-- Phase 5 — Extension admin_settings (mini-CMS produit)
-- À exécuter manuellement dans le Supabase SQL Editor.
-- ============================================================

ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS product_description text;
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS product_status text NOT NULL DEFAULT 'available'
  CHECK (product_status IN ('available', 'coming_soon', 'sold_out'));
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS wero_beneficiary_name text;
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS hero_image_url text;
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS product_image_main_url text;
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS product_image_secondary_1_url text;
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS product_image_secondary_2_url text;

-- Phase 6 — Champs supplémentaires admin_settings
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS product_back_message text;

-- RPC : ajustement encadré du stock (met à jour remaining_stock ET is_available)
CREATE OR REPLACE FUNCTION adjust_stock(p_remaining integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_initial integer;
BEGIN
  SELECT initial_stock INTO v_initial
    FROM product_stock
    WHERE product_name = 'T-shirt FNIX Drop 044' AND size = 'M';

  IF p_remaining < 0 OR p_remaining > v_initial THEN
    RAISE EXCEPTION 'Valeur hors bornes (0 à %)', v_initial;
  END IF;

  UPDATE product_stock
    SET remaining_stock = p_remaining,
        is_available = (p_remaining > 0),
        updated_at = now()
    WHERE product_name = 'T-shirt FNIX Drop 044' AND size = 'M';
END;
$$;
