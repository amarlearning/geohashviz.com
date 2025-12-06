import "@testing-library/jest-dom";
import { vi } from "vitest";

// Provide a minimal Jest compatibility shim for tests that call jest.fn/spies
// Vitest offers an equivalent API via `vi`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).jest = vi;
