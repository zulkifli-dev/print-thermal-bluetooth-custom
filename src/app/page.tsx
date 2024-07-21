"use client";

import ButtonPrint from "@/components/button/button-print";

const data = {
  faktur: "INV123456",
  createdAt: "2024-07-21T10:00:00Z",
  toko: {
    namaToko: "Toko ABC",
    alamat: "Jl. Contoh No.123",
    kota: "Kota Mamuju",
  },
  totalTunai: 150000,
  detailPenjualan: [
    {
      barang: {
        name: "Produk A",
      },
      disc: 5000,
      price: 50000,
      qty: 2,
    },
    {
      barang: {
        name: "Produk B 2 new type 2139S9221233SA",
      },
      disc: 0,
      price: 25000,
      qty: 1,
    },
  ],
};

export default function Page() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Example</h1>
      <ButtonPrint data={data} />
    </div>
  );
}
