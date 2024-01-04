// helper functions to format views
function formatViews(views: number): string {
    const postfix: string[] = ["", "k", "M", "B"];
    let index: number = 0;
    while (views >= 1000) {
        views = Math.floor(views / 1000);
        index++;
    }
    return String(views) + postfix[index];
}

export default formatViews;
