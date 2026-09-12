import { getSession } from "@/lib/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <Header session={session} />
      <div className="flex-1 flex flex-col w-full pt-0 md:pt-5">
        <main className="flex-1 flex flex-col w-full">{children}</main>
      </div>
      <Footer />
    </>
  );
}
