"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-quety-client";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
