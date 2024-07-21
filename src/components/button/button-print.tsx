"use client";
import usePrintBluetooth from "@/context/usePrintBluetooth";
import { Data } from "@/type/penjualan";
import { Resi } from "@/utils/format-print";

interface ButtonPrintProps {
  data: Data;
}
function ButtonPrint({ data }: ButtonPrintProps) {
  const { printOut } = usePrintBluetooth();

  const printText = Resi.generateAll({
    invoice: {
      nomor: data.faktur,
      tanggal: new Date(data.createdAt),
    },
    toko: {
      nama: data.toko?.namaToko,
      alamat: data.toko?.alamat,
      kota: "Kota Mamuju",
    },
    tunai: data.totalTunai,
    products: data.detailPenjualan.map((penjualan: any) => {
      return {
        name: penjualan.barang?.name || "NN",
        disc: penjualan.disc,
        price: penjualan.price || 0,
        qty: penjualan.qty,
      };
    }),
  });

  return (
    <button
      onClick={() => printOut(printText)}
      className="flex-1 flex gap-1 min-w-[200px] my-4"
    >
      Print
    </button>
  );
}

export default ButtonPrint;
