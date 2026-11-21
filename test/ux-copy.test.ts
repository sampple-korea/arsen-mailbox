import { describe, expect, it } from "vitest";
// @ts-expect-error browser module without declarations
import { errorMessage } from "../public/js/constants.js";

describe("errorMessage", () => {
  it("uses sending-specific wording only when sending", () => {
    expect(errorMessage({ code: "rate_limited" }, "send")).toContain("너무 빨리");
    expect(errorMessage({ code: "invalid" }, "send")).toContain("보낼 수 없는 내용");
    expect(errorMessage({ code: "rate_limited" })).toContain("잠시 제한");
    expect(errorMessage({ code: "invalid" })).toContain("입력 형식");
  });

  it("prefers the server's retry hint", () => {
    expect(errorMessage({ code: "rate_limited", retryAfter: 12 }, "send")).toContain("12초");
  });

  it("never exposes the old assistant-only wording to people", () => {
    expect(errorMessage({ code: "rate_limited" })).not.toContain("빈 확인");
  });
});
