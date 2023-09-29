"use client";
import { useState, useCallback } from "react";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/AppContext";
import { Textarea } from "@/components/ui/textarea";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { Label } from "@/components/ui/label";
import { llm_ops_run } from "@/lib/llmOps";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Home() {
  const { toast } = useToast();
  const {
    openaiKey,
    heliconeKey,
    inputText,
    setInputText,
    outputText,
    setOutputText,
    schema,
    setSchema,
  } = useAppContext();
  const [running, setRunning] = useState(false);
  const runButton = async () => {
    try {
      if (!openaiKey) {
        toast({
          variant: "destructive",
          title: "未设置OpenaiKey",
          description: "请先点击右上角设置OpenaiKey",
        });
        return;
      }
      setRunning(true);
      setOutputText({ 输出: "正在运行，请稍等..." });
      const res = await llm_ops_run(schema, inputText, openaiKey, heliconeKey);
      setOutputText(res);
    } catch (error) {
      setOutputText({ error: String(error) });
      toast({
        variant: "destructive",
        title: "哦不！出错了~",
        description: String(error),
      });
    } finally {
      setRunning(false);
    }
  };

  const onChange = useCallback(
    (val: string, viewUpdate: any) => {
      setSchema(val);
    },
    [setSchema]
  );

  const { theme, setTheme } = useTheme();

  return (
    <section className=" w-full h-full">
      <section className="flex h-full w-full flex-col justify-between p-7 pb-3">
        <Wrapper>
          <div className="mx-auto flex  flex-col md:flex-row justify-between h-full w-full items-center md:space-x-5 m-5">
            <div className="flex-1 md:basis-3/4 justify-center h-full flex flex-col md:max-w-[80%] w-full">
              <div className="flex-1 basis-3/5 justify-center">
                <Label htmlFor="message">JSON Schema</Label>
                <CodeMirror
                  id="message"
                  className="h-[90%]"
                  value={schema}
                  height="100%"
                  theme={theme === "dark" ? githubDark : githubLight}
                  onChange={onChange}
                  extensions={[json()]}
                  maxHeight="30rem"
                />
              </div>
              <div className="flex-1 basis-1/5 justify-center flex-grow mt-3">
                <Label htmlFor="message">输入</Label>
                <Textarea
                  placeholder="请在这里输入。"
                  id="message"
                  className="h-[80%]"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <Button onClick={runButton} disabled={running} className="mt-5">
                {running ? "运行中..." : "运行"}
              </Button>
            </div>
            <div className="flex md:basis-1/4 justify-center h-full w-full">
              <div className="w-full h-full">
                <ScrollArea className="min-h-full">
                  {!!outputText &&
                    Object.entries(outputText).map(([key, value]) => {
                      return (
                        <Card key="{key}" className="my-2">
                          <CardContent>
                            <CardHeader>
                              <CardTitle>{key}</CardTitle>
                            </CardHeader>
                            <CardDescription>
                              {JSON.stringify(value)}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      );
                    })}
                </ScrollArea>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </section>
  );
}
