import EntriesProvider from "../context/EntriesContext";
import "../global-styles.css";

export const metadata = {
  title: "done list",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EntriesProvider>{children}</EntriesProvider>
      </body>
    </html>
  );
}
