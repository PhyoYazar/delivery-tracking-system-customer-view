import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { RouterTransition } from "~/features/common/RouterTransition";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: inter.style.fontFamily,
      }}
    >
      <Notifications position="bottom-right" zIndex={100} />
      <RouterTransition />
      <ModalsProvider>
        <Component {...pageProps} />;
      </ModalsProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
