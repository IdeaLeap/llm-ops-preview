import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useAppContext } from "@/lib/AppContext";
export function OpenaiKey() {
  const { openaiKey, setOpenaiKey, heliconeKey, setHeliconeKey } =
    useAppContext();
  return (
    <Dialog>
      <DialogTrigger asChild aria-controls="radix-:R2mcq:">
        <button className={`p-1`}>
          <Icons.setting classes="" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>设置api-key</DialogTitle>
          <DialogDescription>
            目前仅支持Openai模型、Helicone API代理（可选）
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="openai-api-key" className="text-right">
              openai-key
            </Label>
            <Input
              id="openai-api-key"
              className="col-span-3"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="helicone-api-key" className="text-right">
              helicone-key
            </Label>
            <Input
              id="helicone-api-key"
              className="col-span-3"
              value={heliconeKey}
              onChange={(e) => setHeliconeKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
