export const metadata = {
  title: "Link do Amor",
  description: "Surpresas românticas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
