import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvancedOptions from "./AdvancedOptions";

describe("AdvancedOptions Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders with collapsed state by default", () => {
    const onToggle = jest.fn();
    render(
      <AdvancedOptions expanded={false} onToggle={onToggle}>
        <div>Test Content</div>
      </AdvancedOptions>
    );

    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  test("renders with expanded state", () => {
    const onToggle = jest.fn();
    render(
      <AdvancedOptions expanded={true} onToggle={onToggle}>
        <div>Test Content</div>
      </AdvancedOptions>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("calls onToggle when clicked", () => {
    const onToggle = jest.fn();
    render(
      <AdvancedOptions expanded={false} onToggle={onToggle}>
        <div>Test Content</div>
      </AdvancedOptions>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test("supports keyboard navigation with Enter key", () => {
    const onToggle = jest.fn();
    render(
      <AdvancedOptions expanded={false} onToggle={onToggle}>
        <div>Test Content</div>
      </AdvancedOptions>
    );

    const button = screen.getByRole("button");
    fireEvent.keyDown(button, { key: "Enter" });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test("supports keyboard navigation with Space key", () => {
    const onToggle = jest.fn();
    render(
      <AdvancedOptions expanded={false} onToggle={onToggle}>
        <div>Test Content</div>
      </AdvancedOptions>
    );

    const button = screen.getByRole("button");
    fireEvent.keyDown(button, { key: " " });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
