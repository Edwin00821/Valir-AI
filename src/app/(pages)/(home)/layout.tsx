import { Header } from "@/components/layouts/header";

export default async function HomeLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
