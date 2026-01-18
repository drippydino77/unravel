import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-background w-full h-16 z-50 relative shadow-[0_2px_8px_rgba(109,94,247,0.15)] shrink-0">
      <div className="flex items-center h-full px-8">
        <div className="relative h-2/3 aspect-square flex items-center justify-center">
          <Link href="/">
            <Image
              src="/images/unravel_logo.png"
              alt="Unravel Logo"
              fill
              priority
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
