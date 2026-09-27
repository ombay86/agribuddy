import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * Konfigurasi kustom SweetAlert2 dengan tema AgriBuddy (Emerald & Slate)
 */
export const AgriSwal = Swal.mixin({
  customClass: {
    popup: 'rounded-3xl border border-slate-200 p-6 shadow-2xl font-sans',
    title: 'text-lg font-black text-slate-800',
    htmlContainer: 'text-xs text-slate-600 leading-relaxed',
    confirmButton: 'px-5 py-2.5 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer mx-1',
    cancelButton: 'px-5 py-2.5 rounded-xl font-bold text-xs border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer mx-1',
    denyButton: 'px-5 py-2.5 rounded-xl font-bold text-xs bg-rose-600 text-white shadow-md active:scale-95 cursor-pointer mx-1'
  },
  buttonsStyling: false
});

/**
 * Dialog konfirmasi interaktif pengganti confirm()
 */
export async function showConfirm(options: {
  title: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: 'warning' | 'question' | 'info' | 'error';
  isDanger?: boolean;
}): Promise<boolean> {
  const isDanger = options.isDanger ?? true;
  const result = await AgriSwal.fire({
    title: options.title,
    text: options.text || '',
    icon: options.icon || (isDanger ? 'warning' : 'question'),
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText || (isDanger ? 'Ya, Lanjutkan' : 'Ya, Setuju'),
    cancelButtonText: options.cancelButtonText || 'Batal',
    reverseButtons: true,
    focusCancel: isDanger,
    customClass: {
      popup: 'rounded-3xl border border-slate-200 p-6 shadow-2xl font-sans',
      title: 'text-base sm:text-lg font-black text-slate-800',
      htmlContainer: 'text-xs sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: isDanger
        ? 'px-5 py-2.5 rounded-xl font-black text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-900/20 active:scale-95 cursor-pointer'
        : 'px-5 py-2.5 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-900/20 active:scale-95 cursor-pointer',
      cancelButton: 'px-5 py-2.5 rounded-xl font-bold text-xs border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer'
    }
  });

  return result.isConfirmed;
}

/**
 * Notifikasi sukses pengganti alert()
 */
export async function showSuccess(title: string, text?: string): Promise<void> {
  await AgriSwal.fire({
    title,
    text: text || '',
    icon: 'success',
    confirmButtonText: 'Tutup',
    customClass: {
      popup: 'rounded-3xl border border-emerald-200 p-6 shadow-2xl font-sans',
      title: 'text-base sm:text-lg font-black text-emerald-900',
      htmlContainer: 'text-xs sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 cursor-pointer'
    }
  });
}

/**
 * Notifikasi peringatan pengganti alert()
 */
export async function showWarning(title: string, text?: string): Promise<void> {
  await AgriSwal.fire({
    title,
    text: text || '',
    icon: 'warning',
    confirmButtonText: 'Mengerti',
    customClass: {
      popup: 'rounded-3xl border border-amber-200 p-6 shadow-2xl font-sans',
      title: 'text-base sm:text-lg font-black text-amber-900',
      htmlContainer: 'text-xs sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl font-black text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-95 cursor-pointer'
    }
  });
}

/**
 * Notifikasi error / gagal pengganti alert()
 */
export async function showError(title: string, text?: string): Promise<void> {
  await AgriSwal.fire({
    title,
    text: text || '',
    icon: 'error',
    confirmButtonText: 'Tutup',
    customClass: {
      popup: 'rounded-3xl border border-rose-200 p-6 shadow-2xl font-sans',
      title: 'text-base sm:text-lg font-black text-rose-900',
      htmlContainer: 'text-xs sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-900 text-white shadow-md active:scale-95 cursor-pointer'
    }
  });
}

/**
 * Toast notifikasi ringkas di pojok atas
 */
export function showToast(title: string, icon: 'success' | 'info' | 'warning' | 'error' = 'success'): void {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-2xl border border-slate-200 shadow-lg p-3 text-xs font-bold'
    }
  });

  Toast.fire({
    icon,
    title
  });
}

export default AgriSwal;
