import type { ReactNode } from "react";
import { Button } from "./ui/button";

interface WideButtonProps {
    children: ReactNode;
    disabled?: boolean;
}

export function WideButton({ children, disabled }: WideButtonProps) {
    return (
        <Button className="w-full" disabled={disabled}>{children}</Button>
    )
}