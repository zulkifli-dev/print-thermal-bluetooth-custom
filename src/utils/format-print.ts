import { formatDate } from "./format-date";
import { formatRupiah } from "./format-rupiah";
import { MAX_CHARACTER_PRINT } from "./printer-thermal";

interface productType {
  name: string;
  qty: number;
  price: number;
  disc: number;
}

function generateHeader({
  nama,
  alamat,
  kota,
}: {
  nama: string;
  alamat: string;
  kota: string;
}) {
  function makeCanter(text: string) {
    const textLengt = text.length;
    const padLength = (MAX_CHARACTER_PRINT - textLengt) / 2;
    return " ".repeat(Math.floor(padLength)) + text + `\n`;
  }
  return `${makeCanter(nama)}${makeCanter(alamat)}${makeCanter(
    kota
  )}${generateLine()}`;
}

function generateInfo({ nomor, tanggal }: { nomor: string; tanggal: Date }) {
  let time = formatDate(tanggal, "hh:mm:ss") + "WITA";
  let date = formatDate(tanggal, "DD/MM/YYYY");

  let text = `${" ".repeat(MAX_CHARACTER_PRINT - nomor.length)}${nomor}\n`;
  text += `${time}${" ".repeat(
    MAX_CHARACTER_PRINT - time.length - date.length
  )}${date}\n`;
  text += generateLine();
  return text;
}

function generateProduct(products: productType[]) {
  let formattedProducts = products.reduce((result, product, index) => {
    const formattedPrice = ` ${formatRupiah(product.price, "Rp")}`;
    const formattedIndex = "#";
    const priceLength = formattedPrice.length;
    const indexLength = formattedIndex.length;

    if (product.qty > 1) {
      const productNameWidth = MAX_CHARACTER_PRINT - indexLength - 2;
      const truncatedName =
        product.name.length > productNameWidth
          ? product.name.substring(0, productNameWidth - 3) + "..."
          : product.name;

      result += `${formattedIndex}${truncatedName.padEnd(productNameWidth)}\n`;

      const formattedLine2 = `   ${formattedPrice} x ${
        product.qty
      } = Rp${formatRupiah(product.price * product.qty, "")}\n`;
      result += `${" ".repeat(
        MAX_CHARACTER_PRINT - formattedLine2.length
      )} ${formattedLine2}`;
    } else {
      const productNameWidth = MAX_CHARACTER_PRINT - indexLength - priceLength;
      const truncatedName =
        product.name.length > productNameWidth
          ? product.name.substring(0, productNameWidth - 3) + "..."
          : product.name;
      result += `${formattedIndex}${truncatedName.padEnd(
        productNameWidth
      )}${formattedPrice}\n\n`;
    }
    if (product.disc > 0) {
      let stringDiscNominal = formatRupiah(product.disc, "Rp");
      let stringDiscText = `${" ".repeat(indexLength)}Disc.`;
      result += `${stringDiscText}${" ".repeat(
        MAX_CHARACTER_PRINT -
          stringDiscNominal.length -
          stringDiscText.length -
          1
      )}-${stringDiscNominal}\n`;
    }

    if (index === products.length - 1) {
      result = result.substring(0, result.length - 1);
    }
    return result;
  }, "");

  formattedProducts += generateLine();
  return formattedProducts;
}

function generateFooter({
  products,
  tunai,
}: {
  products: productType[];
  tunai: number;
}) {
  const totalHarga = products
    .map((product) => product.price * product.qty)
    .reduce((a, b) => a + b, 0);
  const totalDiskon = products
    .map((product) => product.disc)
    .reduce((a, b) => a + b, 0);
  const totalBayar = totalHarga - totalDiskon;
  const kembalian = tunai - totalBayar;

  const stringTotalHarga = `Total Harga:${formatRupiah(totalHarga, "Rp")}\n`;
  const stringTotalDiskon = `Total Diskon: -${formatRupiah(
    totalDiskon,
    "Rp"
  )}\n`;
  const stringTotalBayar = `Total Bayar: ${formatRupiah(totalBayar, "Rp")}\n`;
  const stringTunai = `Tunai: ${formatRupiah(tunai, "Rp")}\n`;
  const stringKembalian = `Kembalian: ${formatRupiah(kembalian, "Rp")}\n`;

  let text = "";
  if (totalDiskon > 0 && products.length > 0) {
    text += `Total Harga: ${" ".repeat(
      MAX_CHARACTER_PRINT - stringTotalHarga.length
    )}${formatRupiah(totalHarga, "Rp")}\n`;
    text += `Total Diskon: ${" ".repeat(
      MAX_CHARACTER_PRINT - stringTotalDiskon.length
    )} -${formatRupiah(totalDiskon, "Rp")}\n`;
    text += generateLine();
  }
  text += `Total Bayar: ${" ".repeat(
    MAX_CHARACTER_PRINT - stringTotalBayar.length
  )} ${formatRupiah(totalBayar, "Rp")}\n`;
  text += `Tunai: ${" ".repeat(
    MAX_CHARACTER_PRINT - stringTunai.length
  )} ${formatRupiah(tunai, "Rp")}\n`;
  text += generateLine();
  text += `Kembalian: ${" ".repeat(
    MAX_CHARACTER_PRINT - stringKembalian.length
  )} ${formatRupiah(kembalian, "Rp")}\n`;
  text += generateLine("=");
  text += "Terima Kasih atas kunjungan Anda\n\n\n";
  return text;
}

function generateAll({
  toko,
  invoice,
  products,
  tunai,
}: {
  toko: {
    nama: string;
    alamat: string;
    kota: string;
  };
  invoice: {
    nomor: string;
    tanggal: Date;
  };
  products: productType[];
  tunai: number;
}) {
  let text = generateHeader(toko);
  text += generateInfo(invoice);
  text += generateProduct(products);
  text += generateFooter({ products, tunai });
  return text;
}

function generateLine(line = "-") {
  let result = "";
  for (let i = 0; i < MAX_CHARACTER_PRINT; i++) {
    result += line;
  }
  return result + "\n";
}

export const Resi = {
  generateAll,
  generateHeader,
  generateInfo,
  generateProduct,
  generateFooter,
  generateLine,
};
