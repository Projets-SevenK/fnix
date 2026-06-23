import { redirect } from 'next/navigation';

/**
 * /admin root redirects immediately to /admin/commandes.
 * The middleware handles auth protection for the destination route.
 */
export default function AdminPage() {
  redirect('/admin/commandes');
}
