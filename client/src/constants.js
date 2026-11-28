export const CATEGORIES = [
  { value: "phone", label: "Phone" },
  { value: "wallet", label: "Wallet" },
  { value: "keys", label: "Keys" },
  { value: "id-card", label: "ID card" },
  { value: "laptop", label: "Laptop" },
  { value: "bag", label: "Bag" },
  { value: "books", label: "Books" },
  { value: "other", label: "Other" },
];

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });