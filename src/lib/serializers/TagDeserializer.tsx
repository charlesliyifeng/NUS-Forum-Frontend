import Tag from "../../types/Tag";

type tagParams = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    taggingsCount: number;
};

export function deserializeTag(params: tagParams): Tag {
    const tag: Tag = {
        name: params.name,
        count: params.taggingsCount,
    };
    return tag;
}

export function deserializeTagList(data: tagParams[]): Tag[] {
    const tags: Tag[] = [];

    // process data
    if (data) {
        data.forEach((params: tagParams) => {
            const t = deserializeTag(params);
            tags.push(t);
        });
    }

    return tags;
}
