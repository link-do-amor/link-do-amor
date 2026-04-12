"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    fromName: "",
    toName: "",
    memory: "",
    tone: "romântico elegante",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function generateMessage() {
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      const generated = `Desde que ${form.toName || "você"} chegou, minha vida ganhou um brilho diferente. ✨

${form.memory ? `Eu guardo com carinho cada detalhe de ${form.memory}, como se fosse um capítulo especial da nossa história. ` : ""}

Tem algo em você que me traz paz, que me faz sorrir sem motivo e acreditar que o amor pode ser leve e intenso ao mesmo tempo.

Você é especial pra mim de um jeito que palavras nunca vão conseguir explicar completamente… mas ainda assim eu tento, todos os dias.

${form.fromName ? `Com todo meu carinho, ${form.fromName}. ❤️` : "❤️"}`;

      setMessage(generated);
      setLoading(false);
    }, 1200);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f7d7de 0%, #e7b0bb 100%)",
        padding: "40px 20px",
        fontFamily: "Georgia, serif",
      }}
    >
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "rgba(255,255,255,0.88)",
          borderRadius: 32,
          padding: 40,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: 999,
              background: "#fff",
              color: "#b04b68",
              fontSize: 14,
              marginBottom: 18,
            }}
          >
            Link do Amor 💗
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 52,
              color: "#4a2030",
              lineHeight: 1.1,
            }}
          >
            Crie uma surpresa
            <br />
            romântica inesquecível 💖
          </h1>

          <p
            style={{
              maxWidth: 700,
              margin: "18px auto 0",
              fontSize: 18,
              color: "#6b4b56",
              lineHeight: 1.6,
            }}
          >
            Gere uma mensagem especial com um toque elegante e transforme
            sentimentos em uma surpresa linda para quem você ama.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 20,
                fontSize: 26,
                color: "#4a2030",
              }}
            >
              Personalize sua mensagem
            </h2>

            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={labelStyle}>Seu nome</label>
                <input
                  name="fromName"
                  value={form.fromName}
                  onChange={handleChange}
                  placeholder="Ex: Fábio"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Nome da pessoa</label>
                <input
                  name="toName"
                  value={form.toName}
                  onChange={handleChange}
                  placeholder="Ex: Ana"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Lembrança especial</label>
                <textarea
                  name="memory"
                  value={form.memory}
                  onChange={handleChange}
                  placeholder="Ex: nossa primeira viagem..."
                  style={{ ...inputStyle, minHeight: 120 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Tom da mensagem</label>
                <select
                  name="tone"
                  value={form.tone}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option>romântico elegante</option>
                  <option>fofo delicado</option>
                  <option>apaixonado intenso</option>
                </select>
              </div>

              <button
                onClick={generateMessage}
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                {loading ? "Gerando..." : "Gerar mensagem com IA"}
              </button>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(180deg, #fff7f9 0%, #fff 100%)",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              border: "1px solid #f1d7de",
            }}
          >
            <h2 style={titleStyle}>Prévia da mensagem</h2>

            <div style={previewBox}>
              {message || (
                <span style={{ color: "#a1848e" }}>
                  Sua mensagem gerada vai aparecer aqui...
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  color: "#6b4b56",
  fontSize: 14,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #e7c8d1",
  fontSize: 15,
};

const buttonStyle = {
  border: "none",
  borderRadius: 16,
  padding: "16px",
  background: "linear-gradient(135deg, #d35d7b, #b94b6b)",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};

const titleStyle = {
  marginTop: 0,
  marginBottom: 20,
  fontSize: 26,
  color: "#4a2030",
};

const previewBox = {
  borderRadius: 20,
  padding: 24,
  background: "#fff",
  minHeight: 280,
  border: "1px solid #f2e2e7",
  fontSize: 20,
  lineHeight: 1.8,
  color: "#5a3a46",
};
