import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * Konfigurasi kustom SweetAlert2 dengan tema AgriBuddy (Emerald & Slate)
 */
export const AgriSwal = Swal.mixin({
  customClass: {
    popup: 'rounded-3xl border border-slate-200 p-6 shadow-2xl',
    title: 'text-lg  text-slate-800',
    htmlContainer: ' text-slate-600 leading-relaxed',
    confirmButton: 'px-5 py-2.5 rounded-xl   shadow-md transition-all active:scale-95 cursor-pointer mx-1',
    cancelButton: 'px-5 py-2.5 rounded-xl font-bold  border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer mx-1',
    denyButton: 'px-5 py-2.5 rounded-xl font-bold  bg-rose-600 text-white shadow-md active:scale-95 cursor-pointer mx-1'
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
      popup: 'rounded-3xl border border-slate-200 p-6 shadow-2xl',
      title: 'text-base sm:text-lg  text-slate-800',
      htmlContainer: ' sm:text-sm text-slate-600 leading-relaxed mt-2',
      actions: 'gap-3',
      confirmButton: isDanger
        ? 'px-5 py-2.5 rounded-xl text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-900/20 active:scale-95 cursor-pointer'
        : 'px-5 py-2.5 rounded-xl text-sm bg-[#324d1d]/90 hover:bg-[#324d1d] text-white shadow-md shadow-[#324d1d]/20 active:scale-95 cursor-pointer',
      cancelButton: 'px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer'
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
      popup: 'rounded-3xl border border-[#99c30c]/40 p-6 shadow-2xl',
      title: 'text-base sm:text-lg  text-[#324d1d]',
      htmlContainer: ' sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl   bg-[#324d1d]/90 hover:bg-[#324d1d] text-white shadow-md active:scale-95 cursor-pointer'
    }
  });
}

export async function showSuccessHtml(title: string, html: string): Promise<void> {
  await AgriSwal.fire({
    title,
    html,
    icon: 'success',
    confirmButtonText: 'Tutup',
    customClass: {
      popup: 'rounded-3xl border border-[#99c30c]/40 p-6 shadow-2xl',
      title: 'text-base sm:text-lg  text-[#324d1d]',
      htmlContainer: ' sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl   bg-[#324d1d]/90 hover:bg-[#324d1d] text-white shadow-md active:scale-95 cursor-pointer'
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
      popup: 'rounded-3xl border border-[#fed701]/40 p-6 shadow-2xl',
      title: 'text-base sm:text-lg  text-[#324d1d]',
      htmlContainer: ' sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl   bg-[#fe8b02] hover:bg-[#fe8b02]/90 text-[#324d1d] shadow-md active:scale-95 cursor-pointer'
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
      popup: 'rounded-3xl border border-rose-200 p-6 shadow-2xl',
      title: 'text-base sm:text-lg  text-rose-900',
      htmlContainer: ' sm:text-sm text-slate-600 leading-relaxed mt-2',
      confirmButton: 'px-5 py-2.5 rounded-xl   bg-[#324d1d] hover:bg-black text-white shadow-md active:scale-95 cursor-pointer'
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
      popup: 'rounded-2xl border border-slate-200 shadow-lg p-3  font-bold'
    }
  });

  Toast.fire({
    icon,
    title
  });
}

export default AgriSwal;
