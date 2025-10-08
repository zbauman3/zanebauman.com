import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex justify-center grow-0 shrink-0 w-screen bg-inherit border-t-[1px] border-t-solid border-t-neutral-200 dark:border-t-neutral-800">
      <div className="flex flex-col flex-nowrap p-4 items-start justify-start space-y-3 max-w-3xl w-full">
        <p>Zane Bauman ©</p>
        <Link href="mailto:zanebauman55@gmail.com">zanebauman55@gmail.com</Link>
        <Link href="https://github.com/zbauman3">github.com/zbauman3</Link>
      </div>
    </footer>
  );
};
