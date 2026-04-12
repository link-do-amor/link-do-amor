"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    fromName: "",
    toName: "",
    message: "",
    musicUrl: "",
    whatsapp: "",
    buttonText: "Responder agora 💖",
    accent: "rosa",
    tone: "romântico elegante",
    memory: "",
  });

  const [photos, setPhotos] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSurpriseMode, setIsSurpriseMode] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const msg = params.get("msg") || "";
    const music = params.get("music") || "";
    const imgs = params.get("imgs") || "";
    const whatsapp = params.get("whatsapp") || "";
    const buttonText = params.get("buttonText") || "Responder agora 💖";
    const accent = params.get("accent") || "rosa";
    const tone = params.get("tone") || "romântico elegante";
    const memory = params.get("memory") || "";

    if (from || to || msg || music || imgs || whatsapp || memory) {
      setForm({
        fromName: from,
        toName: to,
        message: msg,
        musicUrl: music,
        whatsapp,
        buttonText,
        accent,
        tone,
        memory,
      });

      if (imgs) {
        setPhotos(imgs.split("|").filter(Boolean));
      }

      setIsSurpriseMode(true);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhotosUpload(e) {
    const files = Array.from(e.target.files || []).slice(0, 3);
    if (!files.length) return;

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((results) => {
      setPhotos(results);
    });
  }

  function removePhoto(indexToRemove) {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function buildAiMessage() {
    const to = form.toName || "você";
    const from = form.fromName || "alguém que te ama";

    const toneText =
      form.tone === "fofo delicado"
        ? "de um jeito doce, leve e cheio de carinho"
        : form.tone === "apaixonado intenso"
        ? "de um jeito intenso, profundo e impossível de esconder"
        : "de um jeito elegante, sincero e cheio de sentimento";

    const memoryText = form.memory?.trim()
      ? `Eu guardo com muito carinho cada detalhe de ${form.memory}, como se fosse um dos capítulos mais bonitos da nossa história. `
      : "";

    return `Desde que ${to} chegou, minha vida ganhou um brilho diferente. ✨

${memoryText}Tem algo em você que me traz paz, me faz sorrir sem perceber e transforma momentos simples em lembranças inesquecíveis.

Eu queria te dizer ${toneText} o quanto você é especial pra mim. Sua presença deixa tudo mais bonito, mais leve e mais cheio de sentido.

Talvez eu nunca consiga colocar em palavras tudo o que sinto, mas ainda assim faço questão de tentar — porque você merece saber o tamanho do carinho que existe aqui dentro.

Com todo meu amor e admiração,
${from} 💖`;
  }

  function generateAiMessage() {
    setLoadingAi(true);

    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        message: buildAiMessage(),
      }));
      setLoadingAi(false);
    }, 1000);
  }

  async function copyMessage() {
    if (!form.message) return;
    await navigator.clipboard.writeText(form.message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 1800);
  }

  function buildParams() {
    return new URLSearchParams({
      from: form.fromName,
      to: form.toName,
      msg: form.message,
      music: form.musicUrl,
      imgs: photos.join("|"),
      whatsapp: form.whatsapp,
      buttonText: form.buttonText,
      accent: form.accent,
      tone: form.tone,
      memory: form.memory,
    });
  }

  function generateShareLink() {
    const link = `${window.location.origin}${window.location.pathname}?${buildParams().toString()}`;
    setShareLink(link);
  }

  async function copyLink() {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1800);
  }

  function openSurprise() {
    const url = `${window.location.origin}${window.location.pathname}?${buildParams().toString()}`;
    window.open(url, "_blank");
  }

  function openWhatsAppReply() {
    const number = (form.whatsapp || "").replace(/\D/g, "");
    const baseText = form.toName
      ? `Oi ${form.toName}, eu vi sua cartinha 💖`
      : "Eu vi sua cartinha 💖";

    if (number) {
      window.open(`https://wa.me/55${number}?text=${encodeURIComponent(baseText)}`, "_blank");
      return;
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(baseText)}`, "_blank");
  }

  function backToEditor() {
    window.history.replaceState({}, "", window.location.pathname);
    setIsSurpriseMode(false);
  }

  const accent = useMemo(() => {
    if (form.accent === "roxo") {
      return {
        primary: "#d06cff",
        secondary: "#8b5cf6",
        soft: "rgba(208,108,255,0.16)",
        gradient: "linear-gradient(90deg, #d06cff, #8b5cf6)",
        text: "#f3ddff",
      };
    }

    if (form.accent === "vinho") {
      return {
        primary: "#c9476d",
        secondary: "#7c1635",
        soft: "rgba(201,71,109,0.16)",
        gradient: "linear-gradient(90deg, #d85f87, #7c1635)",
        text: "#ffdce8",
      };
    }

    return {
      primary: "#ff6ea8",
      secondary: "#b56cff",
      soft: "rgba(255,110,168,0.16)",
      gradient: "linear-gradient(90deg, #ff6ea8, #b56cff)",
      text: "#ffe0ed",
    };
  }, [form.accent]);

  const mediaType = useMemo(() => getMediaType(form.musicUrl), [form.musicUrl]);
  const mediaEmbedUrl = useMemo(() => getEmbedUrl(form.musicUrl), [form.musicUrl]);

  if (isSurpriseMode) {
    return (
      <main style={pageStyle}>
        <ResponsiveStyles />

        <div style={{ ...topRibbonStyle, background: accent.gradient }}>
          Responda essa mensagem e demonstre seu amor 💖
        </div>

        <div style={starsOverlayStyle} />

        <section className="surprise-layout" style={surpriseLayoutStyle}>
          <div style={leftPanelStyle}>
            <div style={terminalHeaderStyle}>
              <div style={terminalDotsStyle}>
                <span style={{ ...dotStyle, background: "#ff6b8a" }} />
                <span style={{ ...dotStyle, background: "#ff89a1" }} />
                <span style={{ ...dotStyle, background: "#ffadc0" }} />
              </div>
              <div style={terminalFileStyle}>cartinha.txt</div>
            </div>

            <div style={terminalBodyStyle}>
              <p style={terminalLineStyle}>┌─ Cartinha Especial Criada</p>
              <p style={terminalLineStyle}>│</p>
              <p style={terminalLineStyle}>│ Para: {form.toName || "Pessoa especial"}</p>
              <p style={terminalLineStyle}>│ De: {form.fromName || "Alguém especial"}</p>
              <p style={terminalLineStyle}>│ Status: entregue com amor</p>
              <p style={terminalLineStyle}>└──────────────────────────────</p>
            </div>

            {photos.length > 0 && (
              <div className="photo-grid" style={{ ...photoGridStyle, padding: 20 }}>
                {photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Foto ${index + 1}`} style={photoStyle} />
                ))}
              </div>
            )}
          </div>

          <div style={rightPanelStyle}>
            <div style={badgeStyle(accent)}>Mensagem Especial 💌</div>

            <h1 style={surpriseTitleStyle(accent)}>
              {form.toName ? `${form.toName}, essa cartinha é sua` : "Essa cartinha é sua"}
            </h1>

            <div style={messageBoxStyle}>
              {form.message || "Uma mensagem especial foi preparada para você."}
            </div>

            {mediaType !== "none" && (
              <div style={mediaCardStyle}>
                <div style={mediaTitleStyle}>Nossa música 🎵</div>

                {mediaType === "audio" && (
                  <audio controls style={{ width: "100%" }}>
                    <source src={form.musicUrl} />
                    Seu navegador não suporta áudio.
                  </audio>
                )}

                {mediaType === "spotify" && mediaEmbedUrl && (
                  <iframe
                    src={mediaEmbedUrl}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={iframeStyle}
                  />
                )}

                {mediaType === "youtube" && mediaEmbedUrl && (
                  <div style={videoWrapStyle}>
                    <iframe
                      src={mediaEmbedUrl}
                      title="YouTube player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={videoIframeStyle}
                    />
                  </div>
                )}
              </div>
            )}

            <div style={{ ...ctaBoxStyle, background: accent.soft }}>
              <div style={ctaTextStyle}>
                Responda essa mensagem e demonstre seu amor 💖
              </div>

              <button
                onClick={openWhatsAppReply}
                style={{ ...replyButtonStyle, background: accent.gradient }}
              >
                {form.buttonText || "Responder agora 💖"}
              </button>
            </div>

            <button onClick={backToEditor} style={backButtonStyle}>
              Voltar para edição
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <ResponsiveStyles />

      <div style={{ ...topRibbonStyle, background: accent.gradient }}>
        Agora você pode criar cartinhas com IA, fotos, música e CTA de resposta 💖
      </div>

      <div style={starsOverlayStyle} />

      <section className="hero-grid" style={heroStyle}>
        <div style={terminalCardStyle}>
          <div style={terminalHeaderStyle}>
            <div style={terminalDotsStyle}>
              <span style={{ ...dotStyle, background: "#ff6b8a" }} />
              <span style={{ ...dotStyle, background: "#ff89a1" }} />
              <span style={{ ...dotStyle, background: "#ffadc0" }} />
            </div>
            <div style={terminalFileStyle}>cartinha.txt</div>
          </div>

          <div style={terminalBodyStyle}>
            <p style={terminalLineStyle}>┌─ Criando Cartinha Especial</p>
            <p style={terminalLineStyle}>│</p>
            <p style={terminalLineStyle}>│ Para: {form.toName || "Maria"}</p>
            <p style={terminalLineStyle}>│ De: {form.fromName || "João"}</p>
            <p style={terminalLineStyle}>└──────────────────────────────</p>
            <br />
            <p style={terminalLineStyle}>[1/7] 🤖 IA</p>
            <p style={terminalLineStyle}>[2/7] 💌 Mensagem</p>
            <p style={terminalLineStyle}>[3/7] 📸 Fotos</p>
            <p style={terminalLineStyle}>[4/7] 🎵 Música</p>
            <p style={terminalLineStyle}>[5/7] 🔗 Link</p>
            <p style={terminalLineStyle}>[6/7] ✨ Surpresa</p>
            <p style={terminalLineStyle}>[7/7] ❤️ Resposta</p>
          </div>
        </div>

        <div style={heroTextWrapStyle}>
          <h1 style={heroTitleStyle(accent)}>
            Crie cartinhas
            <br />
            para uma pessoa
            <br />
            especial
          </h1>

          <div style={{ ...heroUnderlineStyle, background: accent.gradient }} />

          <p style={heroSubtitleStyle}>
            Cartinhas digitais com IA, fotos, música e muito amor.
            <br />
            Envie e aumente a chance de resposta com uma CTA emocional no final.
          </p>
        </div>
      </section>

      <section className="builder-grid" style={builderWrapStyle}>
        <div style={glassCardStyle}>
          <h2 style={cardTitleStyle}>Monte sua cartinha</h2>

          <div className="double-grid" style={doubleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Seu nome</label>
              <input
                name="fromName"
                value={form.fromName}
                onChange={handleChange}
                placeholder="Ex: Fábio"
                style={inputStyle}
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Nome da pessoa</label>
              <input
                name="toName"
                value={form.toName}
                onChange={handleChange}
                placeholder="Ex: Ana"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Tom da IA</label>
              <select name="tone" value={form.tone} onChange={handleChange} style={inputStyle}>
                <option value="romântico elegante">Romântico elegante</option>
                <option value="fofo delicado">Fofo delicado</option>
                <option value="apaixonado intenso">Apaixonado intenso</option>
              </select>
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Lembrança especial</label>
              <input
                name="memory"
                value={form.memory}
                onChange={handleChange}
                placeholder="Ex: nossa primeira viagem"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={fieldWrapStyle}>
            <label style={labelStyle}>Mensagem</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem aqui ou use a IA para gerar uma..."
              style={textareaStyle}
            />
          </div>

          <div className="triple-grid" style={tripleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Fotos (até 3)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosUpload}
                style={fileInputStyle}
              />

              {photos.length > 0 && (
                <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => removePhoto(index)}
                      style={removePhotoButtonStyle}
                    >
                      Remover foto {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Link da música</label>
              <input
                name="musicUrl"
                value={form.musicUrl}
                onChange={handleChange}
                placeholder="Spotify, YouTube ou mp3"
                style={inputStyle}
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>WhatsApp para resposta</label>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="Ex: 11999999999"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Texto do botão final</label>
              <input
                name="buttonText"
                value={form.buttonText}
                onChange={handleChange}
                placeholder="Responder agora 💖"
                style={inputStyle}
              />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Cor principal</label>
              <select name="accent" value={form.accent} onChange={handleChange} style={inputStyle}>
                <option value="rosa">Rosa premium</option>
                <option value="roxo">Roxo neon</option>
                <option value="vinho">Vinho elegante</option>
              </select>
            </div>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <button
              onClick={generateAiMessage}
              style={{ ...secondaryButtonStyle, color: "#fff" }}
            >
              {loadingAi ? "Gerando com IA..." : "Gerar mensagem com IA"}
            </button>

            <button onClick={copyMessage} style={secondaryButtonStyle}>
              {copiedMessage ? "Mensagem copiada!" : "Copiar mensagem"}
            </button>
          </div>

          <div className="double-grid" style={doubleGridStyle}>
            <button onClick={generateShareLink} style={secondaryButtonStyle}>
              Gerar link da surpresa
            </button>

            <button onClick={copyLink} style={secondaryButtonStyle}>
              {copiedLink ? "Link copiado!" : "Copiar link"}
            </button>
          </div>

          <button
            onClick={openSurprise}
            style={{ ...primaryButtonStyle, background: accent.gradient }}
          >
            Criar Minha Cartinha ❯
          </button>

          {shareLink && (
            <div style={linkBoxStyle}>
              <div style={linkLabelStyle}>Link gerado</div>
              <div style={linkTextStyle}>{shareLink}</div>
            </div>
          )}
        </div>

        <div style={glassCardStyle}>
          <h2 style={cardTitleStyle}>Prévia premium</h2>

          <div style={previewMessageStyle}>
            {form.message || "Sua mensagem vai aparecer aqui..."}
          </div>

          {photos.length > 0 && (
            <div className="photo-grid" style={photoGridStyle}>
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Preview ${index + 1}`} style={photoStyle} />
              ))}
            </div>
          )}

          {mediaType !== "none" && (
            <div style={mediaCardStyle}>
              <div style={mediaTitleStyle}>Prévia da música 🎵</div>

              {mediaType === "audio" && (
                <audio controls style={{ width: "100%" }}>
                  <source src={form.musicUrl} />
                </audio>
              )}

              {mediaType === "spotify" && mediaEmbedUrl && (
                <iframe
                  src={mediaEmbedUrl}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={iframeStyle}
                />
              )}

              {mediaType === "youtube" && mediaEmbedUrl && (
                <div style={videoWrapStyle}>
                  <iframe
                    src={mediaEmbedUrl}
                    title="YouTube player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={videoIframeStyle}
                  />
                </div>
              )}
            </div>
          )}

          <div style={{ ...upsellBoxStyle, background: accent.soft, color: accent.text }}>
            Na mensagem final vai aparecer:
            <br />
            <strong>“Responda essa mensagem e demonstre seu amor 💖”</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

function getMediaType(url) {
  if (!url) return "none";
  const lower = url.toLowerCase();

  if (
    lower.includes(".mp3") ||
    lower.includes(".wav") ||
    lower.includes(".ogg") ||
    lower.includes(".m4a")
  ) {
    return "audio";
  }

  if (lower.includes("spotify.com")) return "spotify";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";

  return "none";
}

function getEmbedUrl(url) {
  if (!url) return "";

  try {
    if (url.includes("spotify.com")) {
      return url.replace("open.spotify.com/", "open.spotify.com/embed/");
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (url.includes("youtube.com/watch?v=")) {
      const parsed = new URL(url);
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    return "";
  } catch {
    return "";
  }
}

function ResponsiveStyles() {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      input::placeholder,
      textarea::placeholder {
        color: rgba(255, 255, 255, 0.55);
      }

      select,
      input,
      textarea,
      button {
        font: inherit;
      }

      @media (max-width: 1100px) {
        .hero-grid,
        .builder-grid,
        .surprise-layout {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 760px) {
        .double-grid,
        .triple-grid,
        .photo-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, rgba(255,98,160,0.16), transparent 20%), radial-gradient(circle at bottom, rgba(181,108,255,0.14), transparent 18%), linear-gradient(180deg, #120613 0%, #0d0714 100%)",
  color: "#fff",
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  position: "relative",
  overflow: "hidden",
};

const starsOverlayStyle = {
  position: "absolute",
  inset: 0,
  backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
  backgroundSize: "38px 38px",
  opacity: 0.14,
  pointerEvents: "none",
};

const topRibbonStyle = {
  width: "100%",
  color: "#fff",
  textAlign: "center",
  fontWeight: 800,
  fontSize: 16,
  padding: "14px 20px",
  position: "relative",
  zIndex: 2,
};

const heroStyle = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "60px 28px 24px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 40,
  alignItems: "center",
  position: "relative",
  zIndex: 2,
};

const terminalCardStyle = {
  background: "#1a1a1f",
  borderRadius: 30,
  overflow: "hidden",
  boxShadow: "0 30px 80px rgba(0,0,0,0.42)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const terminalHeaderStyle = {
  background: "#3b3740",
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const terminalDotsStyle = {
  display: "flex",
  gap: 10,
};

const dotStyle = {
  width: 14,
  height: 14,
  borderRadius: "50%",
  display: "inline-block",
};

const terminalFileStyle = {
  color: "#ddd1da",
  fontWeight: 700,
  fontSize: 18,
};

const terminalBodyStyle = {
  padding: 28,
  fontFamily: '"Courier New", monospace',
  fontSize: 20,
  color: "#efe4ec",
  lineHeight: 1.8,
};

const terminalLineStyle = {
  margin: 0,
};

const heroTextWrapStyle = {
  paddingRight: 10,
};

const heroTitleStyle = (accent) => ({
  fontSize: "clamp(54px, 7vw, 100px)",
  lineHeight: 0.95,
  margin: 0,
  fontWeight: 900,
  background: accent.gradient,
  WebkitBackgroundClip: "text",
  color: "transparent",
});

const heroUnderlineStyle = {
  height: 6,
  width: "100%",
  margin: "18px 0 28px",
  borderRadius: 999,
};

const heroSubtitleStyle = {
  fontSize: "clamp(20px, 2vw, 30px)",
  color: "#d8ccd8",
  lineHeight: 1.5,
  margin: 0,
};

const builderWrapStyle = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "16px 28px 60px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 28,
  position: "relative",
  zIndex: 2,
};

const glassCardStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 30,
  padding: 28,
  backdropFilter: "blur(12px)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
};

const cardTitleStyle = {
  marginTop: 0,
  marginBottom: 22,
  fontSize: 34,
  color: "#fff",
  fontWeight: 800,
};

const fieldWrapStyle = {
  marginBottom: 16,
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  color: "#f2d9e4",
  fontSize: 14,
  fontWeight: 700,
};

const inputStyle = {
  width: "100%",
  padding: "15px 16px",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.07)",
  color: "#fff",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  minHeight: 180,
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.07)",
  color: "#fff",
  fontSize: 16,
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
  lineHeight: 1.7,
};

const fileInputStyle = {
  width: "100%",
  color: "#fff",
  fontSize: 14,
};

const doubleGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 12,
};

const tripleGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 14,
};

const primaryButtonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  padding: "19px 22px",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  cursor: "pointer",
  marginTop: 8,
  boxShadow: "0 16px 34px rgba(255,110,168,0.26)",
};

const secondaryButtonStyle = {
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 16,
  padding: "15px 16px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};

const removePhotoButtonStyle = {
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 12,
  padding: "10px 12px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  textAlign: "left",
};

const previewMessageStyle = {
  minHeight: 220,
  borderRadius: 22,
  padding: 22,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  lineHeight: 1.8,
  whiteSpace: "pre-wrap",
  fontSize: 17,
};

const linkBoxStyle = {
  marginTop: 16,
  padding: 16,
  borderRadius: 18,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
};

const linkLabelStyle = {
  fontSize: 13,
  color: "#f6dce7",
  marginBottom: 8,
  fontWeight: 800,
};

const linkTextStyle = {
  wordBreak: "break-all",
  color: "#fff",
  fontSize: 14,
  lineHeight: 1.6,
};

const upsellBoxStyle = {
  marginTop: 22,
  padding: 18,
  borderRadius: 18,
  lineHeight: 1.7,
  border: "1px solid rgba(255,255,255,0.08)",
};

const photoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
  marginTop: 18,
};

const photoStyle = {
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
};

const mediaCardStyle = {
  marginTop: 18,
  padding: 18,
  borderRadius: 22,
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const mediaTitleStyle = {
  color: "#ffe0ec",
  fontWeight: 800,
  marginBottom: 12,
};

const iframeStyle = {
  border: "none",
  borderRadius: 16,
};

const videoWrapStyle = {
  position: "relative",
  width: "100%",
  paddingTop: "56.25%",
  borderRadius: 18,
  overflow: "hidden",
};

const videoIframeStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  border: "none",
};

const surpriseLayoutStyle = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "60px 28px",
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: 36,
  alignItems: "start",
  position: "relative",
  zIndex: 2,
};

const leftPanelStyle = {
  background: "#1a1a1f",
  borderRadius: 30,
  overflow: "hidden",
  boxShadow: "0 30px 80px rgba(0,0,0,0.42)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const rightPanelStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 30,
  padding: 30,
  backdropFilter: "blur(12px)",
};

const badgeStyle = (accent) => ({
  display: "inline-block",
  padding: "8px 16px",
  borderRadius: 999,
  background: accent.soft,
  color: accent.text,
  fontWeight: 800,
  fontSize: 14,
  marginBottom: 18,
});

const surpriseTitleStyle = (accent) => ({
  fontSize: "clamp(42px, 5vw, 60px)",
  lineHeight: 1.02,
  marginTop: 0,
  marginBottom: 20,
  fontWeight: 900,
  background: accent.gradient,
  WebkitBackgroundClip: "text",
  color: "transparent",
});

const messageBoxStyle = {
  padding: 24,
  borderRadius: 24,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: 20,
  lineHeight: 1.85,
  whiteSpace: "pre-wrap",
};

const ctaBoxStyle = {
  marginTop: 24,
  padding: 22,
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.08)",
};

const ctaTextStyle = {
  fontSize: 22,
  fontWeight: 900,
  color: "#fff",
  marginBottom: 16,
  textAlign: "center",
};

const replyButtonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  padding: "18px 22px",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  cursor: "pointer",
};

const backButtonStyle = {
  marginTop: 16,
  width: "100%",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 18,
  padding: "14px 18px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};
