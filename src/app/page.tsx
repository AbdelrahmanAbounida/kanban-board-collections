import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center h-screen w-full justify-center gap-4">
      <Link href={"/dnd-kit"}>
        <Button>Dnd-Kit</Button>
      </Link>
      <Link href={"/hello-pangea-dnd"}>
        <Button>Hello-Pangea-Dnd</Button>
      </Link>
      <Link href={"/react-beautiful-dnd"}>
        <Button>React-Beautiful-Dnd</Button>
      </Link>
    </main>
  );
}
