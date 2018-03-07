export const NewsStatusFlag = {
    Published: 1 << 1,   //已发布
    Pushed: 1 << 2,      //已推送
}

export function isNewsPublished(status) {
    return Boolean(status & NewsStatusFlag.Published)
}

export function isNewsPushed(status) {
    return Boolean(status & NewsStatusFlag.Pushed)
}