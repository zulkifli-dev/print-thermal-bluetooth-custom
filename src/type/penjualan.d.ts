export interface Toko {
  namaToko: string;
  alamat: string;
  kota: string;
}

export interface Barang {
  name: string;
}

export interface DetailPenjualan {
  barang: Barang;
  disc: number;
  price: number;
  qty: number;
}

export interface Data {
  faktur: string;
  createdAt: string;
  toko: Toko;
  totalTunai: number;
  detailPenjualan: DetailPenjualan[];
}
