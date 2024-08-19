"use client";

import React, { useCallback, useState } from "react";
import { useLoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import { Input } from "../ui";
import { ClearButton } from "./clearButton";
import { ErrorText } from "./errorText";

interface AddressInputProps {
    apiKey: string;
    onChange?: (value?: string) => void;
    className?: string;
}

const libraries: Libraries = ["places"];

export const AddressInput: React.FC<AddressInputProps> = ({
    apiKey,
    onChange,
    className,
}) => {
    const [autocomplete, setAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);

    const [address, setAddress] = useState("");

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const onLoad = useCallback(
        (autocompleteInstance: google.maps.places.Autocomplete) => {
            setAutocomplete(autocompleteInstance);
        },
        []
    );

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            setAddress(place.formatted_address || "");
            if (onChange) {
                onChange(place.formatted_address || "");
            }
        }
    };

    if (loadError) return <ErrorText text="Error loading Google Maps API" />;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                fields={["formatted_address"]}
                types={["address"]}
            >
                <div className="relative">
                    <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                        className={className}
                    />

                    {address && (
                        <ClearButton
                            onClick={() => {
                                setAddress("");
                            }}
                        />
                    )}
                </div>
            </Autocomplete>
        </div>
    );
};
