export const showToast = (message) => {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.className = "fixed bottom-5 right-5 bg-peach text-white px-4 py-2 rounded-md shadow-md";
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), 3000);
};
