import "../assets/styles/app.scss";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Store from "../store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Toaster containerStyle={{ zIndex: 999999999999 }} />
      <Component {...pageProps} />
    </Store>
  );
}
