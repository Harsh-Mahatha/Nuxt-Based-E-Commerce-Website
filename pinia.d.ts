import "pinia";
import "pinia-plugin-persistedstate";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?:
      | boolean
      | {
          enabled?: boolean;
          key?: string;
          storage?: Storage;
          paths?: string[];
          pick?: string[];
          omit?: string[];
          beforeRestore?: (context: PiniaPluginContext) => void | Promise<void>;
          afterRestore?: (context: PiniaPluginContext) => void | Promise<void>;
          serializer?: {
            serialize: (state: any) => string;
            deserialize: (value: string) => any;
          };
        };
  }
}
