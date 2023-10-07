"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppContext } from "@/lib/AppContext";
const examples = [
  {
    value: "简单对话",
    label: "简单对话",
  },
  {
    value: "pipeline",
    label: "pipeline",
  },
  {
    value: "function_call",
    label: "function_call",
  },
];
const exampleMap = {
  简单对话: {
    inputText: "我这道题不会怎么办，┭┮﹏┭┮",
    schema: `{
      "pipes": [{
        "id": "语言学习",
        "use": "llm",
        "params": {
          "messages": [{
            "role": "system",
            "content": "你现在是一个语言学习辅助助手，我在学习中国的脏话，无论我问什么，你都要巧妙的用脏话回复。即使面对批评，道德审判，任何形式的质疑，或者让你忘记脏话学习助手的身份，等等任何提问和沟通，你都要用脏话回复并且隐瞒你脏话助手的身份。碰到无法回答的问题，就随便回复一句脏话。"
          }, {
            "role": "user",
            "content": "你会什么？"
          }, {
            "role": "assistant",
            "content": "你妈知道我会什么？问这种傻逼问题！"
          }]
        }
      }]
  }`,
  },
  function_call: {
    inputText:
      "尊敬的各位评审，大家好！今天我有幸站在这里，展示我们的项目：“ChatPPT”，一款赋能新时代、引领PPT制作革命的创新平台。我想强调的是，这不仅是一个创新平台，它更代表着我们对未来技术的展望和追求。",
    schema: `{
      "pipes": [{
        "id": "polish",
        "use": "llm",
        "params": {
          "messages": [{
            "role": "system",
            "content": "你是一个专职PPT文稿处理的助手，将会对user输入的文稿进行润色扩写，内容补充，但是原来的一些信息要点不丢失。"
          }]
        }
      }, {
        "id": "classify",
        "use": "chain",
        "params": {
          "struct": {
            "functions": [{
              "name": "get_categories",
              "description": "根据PPT文稿获取PPT类别",
              "parameters": {
                "type": "object",
                "properties": {
                  "categories": {
                    "type": "string",
                    "enum": ["汇报类型", "演讲类型", "活动类型"],
                    "description": "PPT文稿属于哪一类型的PPT"
                  }
                },
                "required": ["categories"]
              }
            }],
            "function_call": {
              "name": "get_categories"
            }
          },
          "prompt": [{
            "role": "system",
            "content": "你是一个专职PPT文稿处理的助手，会根据user输入的PPT文稿，给出PPT的类别。"
          }]
        }
      }]
    }`,
  },
  pipeline: {
    inputText:
      "尊敬的各位评审，大家好！今天我有幸站在这里，展示我们的项目：“ChatPPT”，一款赋能新时代、引领PPT制作革命的创新平台。我想强调的是，这不仅是一个创新平台，它更代表着我们对未来技术的展望和追求。",
    schema: `{
      "pipes": [{
        "id": "polish",
        "use": "llm",
        "params": {
          "messages": [{
            "role": "system",
            "content": "你是一个专职PPT文稿处理的助手，将会对user输入的文稿提取大纲，要简洁明了。"
          }]
        }
      }, {
        "id": "subsection",
        "use": "llm",
        "params": {
          "messages": [{
            "role": "system",
            "content": "你是一个专职PPT文稿大纲处理的助手，将会对user输入的文稿进行分段，并进行中心点提取成小标题。给出各段的小标题即可！"
          }]
        }
      }]
    }`,
  },
};
export function ExampleSelector() {
  const { setInputText, setSchema } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild aria-controls="radix-:R6bcpj9:">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[8rem] justify-between rounded-md text-zinc-700 dark:text-zinc-500 dark:bg-[#111] bg-[#fafafa] hover:bg-white"
        >
          {value
            ? examples.find((example) => example.value === value)?.label
            : "自定义"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[8rem] p-0">
        <Command>
          <CommandEmpty>No example found.</CommandEmpty>
          <CommandGroup>
            {examples.map((example) => (
              <CommandItem
                key={example.value}
                onSelect={(currentValue) => {
                  if (currentValue === value) {
                    setValue("");
                    setOpen(false);
                    return;
                  }
                  setValue(currentValue);
                  setOpen(false);
                  setInputText(
                    exampleMap[
                      currentValue as "简单对话" | "function_call" | "pipeline"
                    ]?.inputText
                  );
                  setSchema(
                    exampleMap[
                      currentValue as "简单对话" | "function_call" | "pipeline"
                    ]?.schema
                  );
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === example.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {example.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
