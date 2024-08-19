import React from "react";
import { WhiteBlock } from "../whiteBlock";
import { FormInput } from "../form";

interface CheckoutPersonalFormProps {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<CheckoutPersonalFormProps> = ({
    className,
}) => {
    return (
        <WhiteBlock title="2. Personal data" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput
                    name="firstName"
                    className="text-base"
                    placeholder="Name"
                />
                <FormInput
                    name="lastName"
                    className="text-base"
                    placeholder="Last name"
                />
                <FormInput
                    name="email"
                    className="text-base"
                    placeholder="E-Mail"
                />
                <FormInput
                    name="phone"
                    className="text-base"
                    placeholder="Phone number"
                />
            </div>
        </WhiteBlock>
    );
};
