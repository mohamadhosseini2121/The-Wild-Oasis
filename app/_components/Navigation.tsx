import CustomLink from "./CustomLink";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <CustomLink
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </CustomLink>
        </li>
        <li>
          <CustomLink
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </CustomLink>
        </li>
        <li>
          {session?.user ? (
            <CustomLink
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </CustomLink>
          ) : (
            <CustomLink
              href="/login"
              className="hover:text-accent-400 transition-colors"
            >
              Login
            </CustomLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
