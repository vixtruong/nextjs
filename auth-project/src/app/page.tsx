import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 min-w-screen">
        <Button>
          <Link href={""}>Home</Link>
        </Button>
        <Button>Logout</Button>
      </div>
    </main>
  );
}
