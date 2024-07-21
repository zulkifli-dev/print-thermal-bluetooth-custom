import moment from "moment";

export function formatDate(date: Date | null, format: string) {
  if (!date) return "-";
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const formattedDate = format
    .replace("Day", hari[moment(date).day()])
    .replace("DD", moment(date).format("DD"))
    .replace("MMMM", bulan[moment(date).month()])
    .replace("MMM", bulan[moment(date).month()]?.substring(0, 3))
    .replace("MM", moment(date).format("MM"))
    .replace("YYYY", moment(date).format("YYYY"))
    .replace("hh", moment(date).format("hh"))
    .replace("mm", moment(date).format("mm"))
    .replace("ss", moment(date).format("ss"));

  return formattedDate;
}
