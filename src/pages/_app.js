import "@/styles/globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/auth";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  );
}
