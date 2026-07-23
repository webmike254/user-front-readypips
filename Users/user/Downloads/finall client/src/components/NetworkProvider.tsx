import { useState, useEffect, createContext, useContext } from "react";
import { WifiOff, Wifi, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NetworkContextType {
  online: boolean;
  wasOffline: boolean;
}

const NetworkContext = createContext<NetworkContextType>({ online: true, wasOffline: false });

export function useNetwork() {
  return useContext(NetworkContext);
}

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [online, setOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const onOnline = () => {
      setOnline(true);
      setWasOffline(true);
      setShowBanner(false);
      setShowRestored(true);
      setTimeout(() => setShowRestored(false), 3000);
    };
    const onOffline = () => {
      setOnline(false);
      setShowBanner(true);
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ online, wasOffline }}>
      {children}
      <AnimatePresence>
        {showBanner && !online && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-warning/10 border-b border-warning/20 px-4 py-2.5 flex items-center justify-center gap-2"
          >
            <WifiOff className="w-4 h-4 text-warning shrink-0" />
            <span className="text-[13px] font-medium text-warning">You are offline. Some features may be unavailable.</span>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-1 text-[13px] text-warning hover:text-warning/80 font-medium ml-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="ml-2 p-1 rounded hover:bg-warning/10 text-warning"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRestored && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-success/10 border-b border-success/20 px-4 py-2.5 flex items-center justify-center gap-2"
          >
            <Wifi className="w-4 h-4 text-success shrink-0" />
            <span className="text-[13px] font-medium text-success">Connection restored</span>
          </motion.div>
        )}
      </AnimatePresence>
    </NetworkContext.Provider>
  );
}
