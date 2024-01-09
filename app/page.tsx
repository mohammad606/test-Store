
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
                <h1 className='text-white text-2xl'>Welcome</h1>
                <Link href={'pages/home'} className='text-red-700 text-2xl'>To Home ..</Link>
    </main>
  )
}
