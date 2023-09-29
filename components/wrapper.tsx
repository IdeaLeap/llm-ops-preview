"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import Setting from "./setting";
import Link from "next/link";
import { Badge } from "./ui/badge";
import {ExampleSelector} from './example-selector'
export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex w-full items-center justify-between flex-col md:flex-row">
        <Link
          href="/"
          className={`flex items-center text-2xl font-bold dark:text-white`}
        >
          LLM Ops. <Badge variant="outline">Preview</Badge>
        </Link>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <ExampleSelector />
          <Setting />
          <ThemeToggle />
        </div>
      </div>
      {children}
      <div className="flex w-full items-center justify-center text-[#666666] flex-col">
        <div>仅供测试（不包含所有功能），请点点<a href="https://github.com/idealeap/llm-ops" className="underline">Github Star</a>支持一下</div>
        <div>CopyRight © 2023-present MarleneJiang & Idealeap.</div>
      </div>
    </>
  );
}
