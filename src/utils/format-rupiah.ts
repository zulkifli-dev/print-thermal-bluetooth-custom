export function formatRupiah(amount: number, currency = "Rp ") {
  try {
    const rupiah = amount.toString().split(".");
    return (
      currency +
      rupiah[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      (rupiah[1] ? "," + rupiah[1] : "")
    );
  } catch (error) {
    return currency + "0";
  }
}
