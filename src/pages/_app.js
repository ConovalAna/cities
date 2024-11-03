import "@/styles/globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
