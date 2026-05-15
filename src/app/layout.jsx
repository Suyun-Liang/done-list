import EntriesProvider from "../context/EntriesContext";
import "../global-styles.css";

export const metadata = {
  title: "done list",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <EntriesProvider>
        <body>{children}</body>
      </EntriesProvider>
    </html>
  );
}
