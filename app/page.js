"use client";

import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");

  function gerarMensagem() {
    setMsg("Gerando...");
    
    setTimeout(() => {
      setMsg("Desde que você chegou, tudo ficou mais bonito. Você é especial pra mim ❤️");
    }, 1000);
  }

  return (
    <div style={{padding: 40, textAlign: "center", background: "linear-gradient(#ffdde1,#ee9ca7)", height: "100vh"}}>
      <div style={{background: "white", padding: 30, borderRadius: 20}}>
        <h1>Link do Amor ❤️</h1>
        <button onClick={gerarMensagem}>Gerar mensagem</button>
        <p>{msg}</p>
      </div>
    </div>
  );
}
