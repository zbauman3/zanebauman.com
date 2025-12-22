import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col flex-nowrap justify-center content-center items-center">
      <h2>Not Found</h2>

      <Link href="/" className="text-blue-400 mt-3">
        Return Home
      </Link>
    </div>
  );
}
