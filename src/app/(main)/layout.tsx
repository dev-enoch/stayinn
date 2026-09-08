import { getSession } from "@/lib/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/ui/BottomNav";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <Header session={session} />
      <div className="flex-1 flex flex-col w-full pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0 pt-0 md:pt-20">
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}
