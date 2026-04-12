"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    fromName: "",
    toName: "",
    memory: "",
    tone: "romântico elegante",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromName = params.get("from") || "";
    const toName = params.get("to") || "";
    const memory = params.get("memory") || "";
    const tone = params.get("tone") || "romântico elegante";
    const msg = params.get("msg") || "";

    if (fromName || toName || memory || msg) {
      setForm({
        fromName,
        toName,
        memory,
        tone,
      });

      if (msg) {
        setMessage(msg);
      }
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function buildMessage() {
    const toneText =
      form.tone === "fofo delicado"
        ? "de um jeito doce, leve e cheio de carinho"
        : form.tone === "apaixonado intenso"
        ? "de um jeito intenso, profundo e impossível de esconder"
        : "de um jeito elegante, sincero e cheio de sentimento";

    return `Desde que ${form.toName || "você"} chegou, minha vida ganhou um brilho diferente. ✨

${form.memory ? `Eu guardo com carinho cada detalhe de ${form.memory}, como se fosse um dos capítulos mais bonitos da nossa história. ` : ""}

Tem algo em você que me traz paz, me faz sorrir sem perceber e transforma momentos simples em lembranças inesquecíveis.

Eu queria te dizer ${toneText} o quanto você é especial pra mim. Você tem um lugar muito bonito no meu coração.

${form.fromName ? `Com todo meu carinho, ${form.fromName}. ❤️` : "❤️"}`;
  }

  function generateMessage() {
    setLoading(true);
    setCopied(false);

    setTimeout(() => {
      const generated = buildMessage();
      setMessage(generated);
      setLoading(false);
    }, 1000);
  }

  async function copyMessage() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function generateShareLink() {
    const finalMessage = message || buildMessage();

    const params = new URLSearchParams({
      from: form.fromName,
      to: form.toName,
      memory: form.memory,
      tone: form.tone,
      msg: finalMessage,
    });

    const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    setShareLink(link);
  }

  function shareWhatsApp() {
    const finalText = encodeURIComponent(
      `${form.toName ? `${form.toName}, ` : ""}fiz isso pra você 💖\n\n${shareLink || window.location.href}`
    );

    window.open(`https://wa.me/?text=${finalText}`, "_blank");
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
            Gere uma mensagem especial, copie, compartilhe no WhatsApp e crie
            um link único para surpreender quem você ama.
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
            <h2 style={titleStyle}>Personalize sua mensagem</h2>

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
                  placeholder="Ex: nossa primeira viagem, nosso primeiro encontro..."
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
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
                style={buttonStylePrimary}
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 18,
              }}
            >
              <button onClick={copyMessage} style={buttonStyleSecondary}>
                {copied ? "Copiado!" : "Copiar mensagem"}
              </button>

              <button onClick={generateShareLink} style={buttonStyleSecondary}>
                Gerar link da surpresa
              </button>
            </div>

            {shareLink && (
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  background: "#fff",
                  border: "1px solid #eed6de",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: "#7b5b66",
                    marginBottom: 8,
                  }}
                >
                  Link gerado
                </div>

                <div
                  style={{
                    wordBreak: "break-all",
                    fontSize: 14,
                    color: "#4a2030",
                    marginBottom: 12,
                  }}
                >
                  {shareLink}
                </div>

                <button onClick={shareWhatsApp} style={buttonStyleWhats}>
                  Compartilhar no WhatsApp
                </button>
              </div>
            )}
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
  outline: "none",
  fontSize: 15,
  boxSizing: "border-box",
  background: "#fffdfa",
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
  whiteSpace: "pre-line",
};

const buttonStylePrimary = {
  border: "none",
  borderRadius: 16,
  padding: "16px",
  background: "linear-gradient(135deg, #d35d7b, #b94b6b)",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};

const buttonStyleSecondary = {
  border: "1px solid #deb8c5",
  borderRadius: 16,
  padding: "14px 16px",
  background: "#fff",
  color: "#7c4055",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const buttonStyleWhats = {
  border: "none",
  borderRadius: 14,
  padding: "14px 18px",
  background: "#25D366",
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};
