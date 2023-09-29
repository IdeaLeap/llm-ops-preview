import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";

export function CodeViewer() {
  return (
    <Dialog>
      <DialogTrigger asChild aria-controls="radix-:R1mcq:">
        <button className={`p-1`}>
          <Icons.code classes="" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>View code</DialogTitle>
          <DialogDescription>
            安装llm-ops包后可以按如下方式使用，支持JS/TS。更多用法可看文档。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="rounded-md dark:bg-black bg-[#fafafa] p-6">
            <pre>
              <code className="grid gap-1 text-sm text-muted-foreground [&_span]:h-4">
                {`
import { Pipeline, PipeRegistry, LLM_OPS_CONFIG } from "llm-ops";
LLM_OPS_CONFIG.OPENAI_API_KEY = "YOUR_API_KEY";
LLM_OPS_CONFIG.OPEN_PATH = {
  baseURL: "https://oai.hconeai.com/v1",
  defaultHeaders: {
    "Helicone-Auth": "Bearer YOUR_TOKEN",
  },
};//这一步可选，如果不设置则使用默认的openai api
const funcStore = PipeRegistry.init();
const schemaJson = JSON.parse(YOUR_SCHEMA_JSON);
const pipeline = Pipeline.fromJSON(schemaJson, {}, funcStore);
const res = await pipeline.execute(YOUR_INPUT);
                `}
              </code>
            </pre>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              注意，API KEY 文件应放在 .env 文件管理，不要直接暴露在代码中!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
