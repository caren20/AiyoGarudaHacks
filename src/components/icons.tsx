import Image from "next/image";

type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = {
  logo: () => (
    <Image src="/images/logo.png" alt="Logo" width="24" height="24" />
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
