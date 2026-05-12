import "../global-styles.css";

export const metadata = {
  title: "done list",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
