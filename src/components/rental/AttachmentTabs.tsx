"use client";

import React, { useState } from "react";

type Props = {
  machineLabel?: string;
  attachmentLabel?: string;
  /** Header counts shown next to each tab label. */
  machineCount: number;
  attachmentCount: number;
  /** Pre-rendered panes. Both stay in the DOM, the inactive one is hidden so
   *  state inside each pane survives switches and HTML hydrates correctly. */
  machinesPane: React.ReactNode;
  attachmentsPane: React.ReactNode;
};

export function AttachmentTabs({
  machineLabel = "Machines",
  attachmentLabel = "Attachments",
  machineCount,
  attachmentCount,
  machinesPane,
  attachmentsPane,
}: Props) {
  const [active, setActive] = useState<"machines" | "attachments">("machines");

  return (
    <div className="flex flex-col gap-10">
      <div role="tablist" className="flex items-center gap-2 border-b border-brand-gray-300">
        <button
          role="tab"
          aria-selected={active === "machines"}
          onClick={() => setActive("machines")}
          className={`px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors border-b-2 -mb-px ${
            active === "machines"
              ? "border-brand-red text-brand-red"
              : "border-transparent text-brand-gray-500 hover:text-brand-gray-900"
          }`}
        >
          {machineLabel}
          <span className="ml-2 text-[11px] tabular-nums text-brand-gray-500">{machineCount}</span>
        </button>
        <button
          role="tab"
          aria-selected={active === "attachments"}
          onClick={() => setActive("attachments")}
          className={`px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors border-b-2 -mb-px ${
            active === "attachments"
              ? "border-brand-red text-brand-red"
              : "border-transparent text-brand-gray-500 hover:text-brand-gray-900"
          }`}
        >
          {attachmentLabel}
          <span className="ml-2 text-[11px] tabular-nums text-brand-gray-500">{attachmentCount}</span>
        </button>
      </div>

      <div role="tabpanel" hidden={active !== "machines"}>
        {machinesPane}
      </div>
      <div role="tabpanel" hidden={active !== "attachments"}>
        {attachmentsPane}
      </div>
    </div>
  );
}
