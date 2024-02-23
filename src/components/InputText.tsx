import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputTextProps {
  label: string;
  name: string;
  placeholder: string;
}

export function InputText({ label, name, placeholder }: InputTextProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name} />
      {label}
      <Input type="text" id={name} name={name} placeholder={placeholder} />
    </div>
  );
}
