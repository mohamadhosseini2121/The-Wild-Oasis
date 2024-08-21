"use client";
import React, { CSSProperties, FC } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../_context/AppContext";
interface props extends LinkProps {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
const CustomLink: FC<props> = ({ className, children, style, ...props }) => {
  const Path = usePathname();
  const { setContextLoading } = useApp();
  const isCurrent = Path === props.href;
  return (
    <Link
      className={`${className} ${isCurrent ? "active" : ""}`}
      style={style}
      {...props}
      onClick={(e) => {
        if (!isCurrent) setContextLoading(true);
        if (props.onClick && typeof props.onClick === "function")
          props.onClick(e);
      }}
    >
      {children}
    </Link>
  );
};
export default CustomLink;
