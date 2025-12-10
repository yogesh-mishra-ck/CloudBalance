import React from "react";
import { toast } from "sonner";

const HandleCopy = (copyText) => {
  if (!copyText) {
    toast.error("Nothing to copy!", { position: "top-center" });
    return;
  }
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      toast.success("Copied to clipboard", { position: "top-center" });
    })
    .catch(() => {
      toast.error("Failed to copy!", { position: "top-center" });
    });
};

export default HandleCopy;
