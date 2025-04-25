import { AppProps } from 'next/app';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout';
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;