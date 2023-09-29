"use client";

import React from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";
import { CodeViewer } from "./code-viewer";
import {OpenaiKey} from './openai-key'
export default function Setting() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex border items-center bg-[#fafafa] dark:bg-[#111] dark:border-zinc-800 p-1 px-4 justify-between rounded-md space-x-3">
      <CodeViewer/>
      <OpenaiKey/>
    </div>
  );
}
