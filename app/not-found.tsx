import { Container, InfoBlock } from "@/shared/components";

export default function NotFoundPage() {
    return (
        <Container className="flex flex-col items-center justify-center my-16 lg:my-40 px-3 sm:px-6 lg:px-8 xl:px-0">
            <InfoBlock
                title="Page not found"
                text="Please check that the address you entered is correct or try again later."
                imageUrl="/assets/images/not-found.png"
            />
        </Container>
    );
}
