import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://ifrbxthbffpjrgjywtve.supabase.co",
  "sb_publishable_F9eLxTwVgSNBUNQLn-Wrcw_PXF5QLYW"
);

let channel;

// 🎮 JOIN ROOM
export function joinRoom(room){
  channel = supabase.channel("music-" + room);

  channel.on("broadcast", { event: "action" }, (payload) => {
    if (window.handleRemoteAction) {
      window.handleRemoteAction(payload.payload);
    }
  });

  channel.subscribe();
}

// 📡 SEND ACTION
export function sendAction(data){
  if(channel){
    channel.send({
      type: "broadcast",
      event: "action",
      payload: data
    });
  }
}
