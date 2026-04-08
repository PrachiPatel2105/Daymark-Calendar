import WallCalendar from "@/components/WallCalendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <WallCalendar />
    </main>
  );
}
