function handleError(error) {
  console.error("error", error);
  return null;
}
export function connectBluetoothPrinterThermal() {
  const UUID = "000018f0-0000-1000-8000-00805f9b34fb";
  const UUID_CHARACTERISTIC = "00002af1-0000-1000-8000-00805f9b34fb";
  return navigator.bluetooth
    .requestDevice({
      filters: [
        {
          services: [UUID],
        },
      ],
    })
    .then((device) => device.gatt.connect())
    .then((server) => server.getPrimaryService(UUID))
    .then((service) => service.getCharacteristic(UUID_CHARACTERISTIC))
    .then((characteristic) => characteristic)
    .catch(handleError);
}

export function writePrintOut(printCharacteristic, text) {
  const encoder = new TextEncoder("utf-8");
  const textEncoder = encoder.encode(text);

  const chunkSize = 512;

  function writeNextChunk(offset) {
    const chunk = textEncoder.slice(offset, offset + chunkSize);

    if (chunk.length > 0) {
      printCharacteristic
        .writeValue(chunk)
        .then(() => {
          // Lanjutkan menulis jika masih ada bagian yang tersisa
          writeNextChunk(offset + chunkSize);
        })
        .catch((error) => {
          console.error("Error writing characteristic value:", error);
        });
    }
  }

  // Mulai menulis dengan bagian pertama
  writeNextChunk(0);
}

export const MAX_CHARACTER_PRINT = 32;
