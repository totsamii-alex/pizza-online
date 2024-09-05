"use client";

import { IStory } from "@/shared/services/stories";
import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { Api } from "@/shared/services/apiClient";
import ReactStories from "react-insta-stories";
import { StoryItemType } from "@prisma/client";

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();

    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }

        fetchStories();
    }, []);

    const onClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    };

    return (
        <>
            <Container
                className={cn(
                    "flex gap-3 my-10 px-3 sm:px-6 lg:px-8 xl:px-0 overflow-x-scroll scrollbar-none",
                    className
                )}
            >
                {stories.length === 0 &&
                    [...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="w-[200px] h-[250px] shrink-0 basis-auto bg-gray-200 rounded-md animate-pulse"
                        />
                    ))}

                {stories.map((story) => (
                    <img
                        key={story.id}
                        onClick={() => onClickStory(story)}
                        className="rounded-md cursor-pointer w-[100%] h-auto max-w-[200px] max-h-[250px] shrink-0 basis-auto object-cover object-top hover:scale-105 transition-all duration-200"
                        src={story.previewImageUrl}
                        alt={`Story ${story.id}`}
                    />
                ))}

                {open && (
                    <div
                        className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30"
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className="relative w-[90%] h-[90%] sm:w-[65%] sm:h-[60%] lg:max-w-[30%] lg:max-h-[80%] overflow-hidden"
                            onClick={(
                                event: React.MouseEvent<HTMLDivElement>
                            ) => event.stopPropagation()}
                        >
                            <button
                                className="absolute -right-10 -top-5 z-30"
                                onClick={() => setOpen(false)}
                            >
                                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={
                                    selectedStory?.items.map((item) => ({
                                        url: item.sourceUrl,
                                        type:
                                            item.type === StoryItemType.IMAGES
                                                ? "image"
                                                : "video",
                                    })) || []
                                }
                                defaultInterval={3000}
                                width={"100%"}
                                height={"100%"}
                                storyContainerStyles={{
                                    overflow: "hidden",
                                    objectFit: "cover",
                                }}
                                storyInnerContainerStyles={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};
