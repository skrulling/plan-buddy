import type { ReactNode } from "react";
import { Button } from "./ui/button";

interface WideButtonProps {
    children: ReactNode;
}

export function WideButton({ children }: WideButtonProps) {
    return (
        <Button className="w-full">{children}</Button>
    )
}