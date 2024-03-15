"use client";

interface SpinerProps {
  size?: "extra-small" | "small" | "medium" | "large";
  color?: "white" | "black" | "primary" | "secondary";
}

function Spinner({ size = "large", color = "primary" }: SpinerProps) {
  const sizeOptions = {
    ["extra-small"]: "1.5rem",
    small: "2rem",
    medium: "3rem",
    large: "4rem",
  };

  const colorOptions = {
    white: "#FFFFFF",
    black: "#1C2434",
    primary: "#2FC0A6",
    secondary: "#4C4C6D",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          height: sizeOptions[size],
          width: sizeOptions[size],
          borderColor: colorOptions[color],
          borderTopColor: "transparent",
        }}
        className="animate-spin rounded-full border-4 border-solid"
      ></div>
    </div>
  );
}

export default Spinner;
