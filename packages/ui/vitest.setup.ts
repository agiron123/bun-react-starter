import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// jsdom does not include ResizeObserver (used by Radix Slider, Tooltip, input-otp, etc.)
/* eslint-disable @typescript-eslint/no-empty-function */
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
/* eslint-enable @typescript-eslint/no-empty-function */
global.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;

// jsdom does not include scrollIntoView (used by cmdk)
Element.prototype.scrollIntoView = vi.fn();

// jsdom does not include matchMedia (used by vaul drawer)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
