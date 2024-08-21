"use client";
import { _conversations } from "@/_mock/_email";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex gap-7 m-4">
      <Button onClick={() => router.push("/mail/mail-list")}>
        Ir a mensajes
      </Button>
    </main>
  );
}
