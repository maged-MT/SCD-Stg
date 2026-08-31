import { BUSINESS } from "@/lib/seo";

const WHATSAPP_NUMBER = "971522499708";
const WHATSAPP_MESSAGE = `Hi ${BUSINESS.name}, I'd like to sell my car.`;

export default function WhatsAppWidget() {
  const href = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}&type=phone_number&app_absent=0`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 md:right-6 bottom-[86px] md:bottom-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4.001 8.373 4.001 15c0 2.383.7 4.6 1.902 6.463L4 29l7.73-1.865A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.75a9.7 9.7 0 0 1-4.94-1.354l-.354-.21-4.586 1.107 1.144-4.469-.23-.366A9.7 9.7 0 0 1 5.751 15c0-5.652 4.6-10.25 10.253-10.25S26.257 9.348 26.257 15 21.658 24.75 16.004 24.75zm5.62-7.646c-.308-.154-1.82-.898-2.102-1.001-.282-.103-.487-.154-.692.154-.205.308-.795 1.001-.975 1.206-.18.205-.359.231-.667.077-.308-.154-1.3-.479-2.476-1.527-.915-.816-1.533-1.824-1.713-2.132-.18-.308-.019-.474.135-.627.138-.138.308-.359.462-.539.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.666-.949-2.283-.25-.6-.503-.519-.692-.529-.18-.008-.385-.01-.59-.01a1.13 1.13 0 0 0-.82.385c-.282.308-1.077 1.052-1.077 2.565s1.103 2.975 1.257 3.18c.154.205 2.17 3.313 5.257 4.646.734.317 1.307.507 1.754.649.737.234 1.408.201 1.938.122.591-.088 1.82-.744 2.077-1.462.256-.719.256-1.335.18-1.463-.077-.128-.282-.205-.59-.36z" />
      </svg>
    </a>
  );
}
