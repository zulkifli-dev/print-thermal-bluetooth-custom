import {
  connectBluetoothPrinterThermal,
  writePrintOut,
} from "@/utils/printer-thermal";
import { create } from "zustand";

interface StoreState {
  connection: any;
}

interface StoreActions {
  setConnector: (connect: any) => void;
  printOut: (text: string) => void;
}

type StoreType = StoreState & StoreActions;

const usePrintBluetooth = create<StoreType>((set, get) => ({
  connection: null,
  setConnector: () =>
    set((state) => {
      if (state.connection === null) {
        connectBluetoothPrinterThermal().then(
          (connect: any) => (state.connection = connect)
        );
      }
      return state;
    }),
  printOut: (text: string) => {
    if (!get().connection) {
      connectBluetoothPrinterThermal().then(
        (connect: any) => (get().connection = connect)
      );
    }
    if (get().connection) {
      writePrintOut(get().connection, text);
    }
  },
}));

export default usePrintBluetooth;
