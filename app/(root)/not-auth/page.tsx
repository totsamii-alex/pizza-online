import { Container, InfoBlock } from "@/shared/components";

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
