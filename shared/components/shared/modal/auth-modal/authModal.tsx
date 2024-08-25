"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/shared/components";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/loginForm";
import { RegisterForm } from "./forms/registerForm";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
    const [type, setType] = React.useState<"login" | "register">("login");

    const onSwitchType = () => {
        setType(type === "login" ? "register" : "login");
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogTitle className="hidden" />
            <DialogContent className="w-[450px] bg-white p-10">
                {type === "login" ? (
                    <LoginForm onClose={handleClose} />
                ) : (
                    <RegisterForm onClose={handleClose} />
                )}

                <hr />

                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn("github", {
                                callbackUrl: "/",
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1"
                    >
                        <Image
                            width={24}
                            height={24}
                            alt="GitHub logo"
                            src="https://github.githubassets.com/favicons/favicon.svg"
                        />
                        GitHub
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn("google", {
                                callbackUrl: "/",
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1"
                    >
                        <Image
                            width={24}
                            height={24}
                            alt="Google logo"
                            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                        />
                        Google
                    </Button>
                </div>

                <Button
                    variant="outline"
                    onClick={onSwitchType}
                    type="button"
                    className="h-12"
                >
                    {type !== "login" ? "Login" : "Register"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};
