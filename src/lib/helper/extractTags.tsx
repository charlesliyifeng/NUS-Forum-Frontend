function extractTags(value: string): [string, string] {
    const tags: string[] = [];
    let tag = "";
    let query = "";
    let index = 0;
    let insideTag = false;
    while (index < value.length) {
        if (insideTag) {
            if (value[index] === "]") {
                if (tag) {
                    // remove invalid chars from tag
                    tag.replace(/\s[|&;$%@"<>()+,]/g, "");
                    tags.push(tag);
                    tag = "";
                }
                insideTag = false;
            } else {
                tag += value[index];
            }
        } else if (value[index] === "[") {
            insideTag = true;
        } else {
            query += value[index];
        }
        index++;
    }

    query += tag;

    return [tags.join(","), query];
}

export default extractTags;
