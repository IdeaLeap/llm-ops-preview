'use server'
import { Pipeline, PipeRegistry, LLM_OPS_CONFIG,EventEmitter } from "llm-ops";
import { useAppContext } from "@/lib/AppContext";
export const llm_ops_run = async (
  schema,
  inputText,
  openaiKey,
  heliconeKey
) => {
  try {

    LLM_OPS_CONFIG.OPENAI_API_KEY = openaiKey || "";
    !!heliconeKey && (LLM_OPS_CONFIG.HELICONE_AUTH_API_KEY = heliconeKey);
    !!heliconeKey && (LLM_OPS_CONFIG.OPEN_PATH = {
      baseURL: "https://oai.hconeai.com/v1",
      defaultHeaders: {
        "Helicone-Auth": `Bearer ${heliconeKey}`,
      },
    });
    const funcStore = PipeRegistry.init();
    const schemaJson = JSON.parse(schema);
    const pipeline = Pipeline.fromJSON(schemaJson, {}, funcStore);
    const res = await pipeline.execute(inputText);
    return res;
  } catch (e) {
    throw e
  }
};