import "@/src/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, Spring, motion } from "framer-motion";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { trpc } from "@/utils/trpc";
// import { Example } from "@/components/Example";

function App({ Component, pageProps, router }: AppProps) {
  const queryClient = new QueryClient();
  const transitionSpring: Spring = {
    type: "spring",
    mass: 0.2,
    stiffness: 80,
    damping: 10,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait" initial={false}>
        {/* <Example /> */}
        <motion.div key={router.route}>
          {/* <motion.div
            style={{
              backgroundColor: "white",
              position: "fixed",
              width: "100vw",
              zIndex: 1000,
              bottom: 0,
            }}
            transition={transitionSpring}
            animate={{ height: "0vh" }}
            exit={{ height: "100vh" }}
          > */}
          <motion.div
            style={{
              backgroundColor: "black",
              width: "100vw",
            }}
            transition={transitionSpring}
            initial={{ height: "100vh" }}
            animate={{ height: "0vh", transition: { delay: 0.2 } }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* </motion.div> */}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default trpc.withTRPC(App);
