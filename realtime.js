console.log("✅ realtime.js chargé");
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ CONFIG SUPABASE (OK EN FRONTEND)
const SUPABASE_URL = "https://ifrbxthbffpjrgjywtve.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_F9eLxTwVgSNBUNQLn-Wrcw_PXF5QLYW";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ✅ TEST TEMPS RÉEL SIMPLE
export function initRealtimeTest() {
  const channel = supabase.channel("test-channel");

  channel.on("broadcast", { event: "ping" }, payload => {
    console.log("📡 Reçu :", payload);
  });

  channel.subscribe(status => {
    if (status === "SUBSCRIBED") {
      console.log("✅ Realtime connecté");
    }
  });

  // ping test
  setTimeout(() => {
    channel.send({
      type: "broadcast",
      event: "ping",
      payload: { msg: "hello realtime" }
    });
  }, 2000);
}
