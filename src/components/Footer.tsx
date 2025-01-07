import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex items-center justify-center bottom-0 w-full bg-blue-300">
      <div className="flex gap-40">
        <div className="flex flex-col">
          <Link href={"/"}>option 1</Link>
          <Link href={"/"}>option 2</Link>
          <Link href={"/"}>option 3</Link>
          <Link href={"/"}>option 4</Link>
        </div>
        <div className="flex flex-col">
          <Link href={"/"}>option 1</Link>
          <Link href={"/"}>option 2</Link>
          <Link href={"/"}>option 3</Link>
          <Link href={"/"}>option 4</Link>
        </div>
        <div className="flex flex-col">
          <Link href={"/"}>option 1</Link>
          <Link href={"/"}>option 2</Link>
          <Link href={"/"}>option 3</Link>
          <Link href={"/"}>option 4</Link>
        </div>
      </div>
    </div>
  );
}
