import SupportSidebar from "@/components/layout/SupportSidebar";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 max-w-[1280px] mx-auto w-full pt-28 px-4 md:px-12 gap-8 pb-24 min-h-screen">
      <SupportSidebar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl">
        {children}
      </main>
    </div>
  );
}
