export type TypeStrings = "login" | "reg";

export interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  type: TypeStrings;
}

export interface AuthProviderProps extends AuthModalProps {
  onOpen: () => void;
  setType: (arg: TypeStrings) => void;
}
