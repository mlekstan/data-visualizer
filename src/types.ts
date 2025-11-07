import type { LinkOptions } from "@tanstack/react-router";

export type ExtendedLinkOptions = LinkOptions & {
  name: string;
}