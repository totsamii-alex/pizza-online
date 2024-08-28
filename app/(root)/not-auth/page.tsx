import { Container, InfoBlock } from "@/shared/components";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Not authorized | Online Pizza",
    };
}

export default function UnauthorizedPage() {
    return (
        <Container className="flex flex-col items-center justify-center my-40">
            <InfoBlock
                title="Access denied"
                text="This page can only be viewed by authorized users"
                imageUrl="/assets/images/lock.png"
            />
        </Container>
    );
}
