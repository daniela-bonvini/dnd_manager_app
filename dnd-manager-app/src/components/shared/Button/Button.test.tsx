import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("should render with label", () => {
    render(<Button buttonLabel="Click me" handleButtonClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call handleButtonClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button buttonLabel="Click me" handleButtonClick={handleClick} />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button buttonLabel="Click me" handleButtonClick={() => {}} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should render children along with label", () => {
    render(
      <Button buttonLabel="Click me" handleButtonClick={() => {}}>
        <span>Icon</span>
      </Button>
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should not call handleButtonClick when disabled and clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button buttonLabel="Click me" handleButtonClick={handleClick} disabled={true} />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
