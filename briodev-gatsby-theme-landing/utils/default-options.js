module.exports = themeOptions => {
    const basePath = themeOptions.basePath || `/landing-pages`
    const contentPath = themeOptions.contentPath || `content/landing-pages`
    const tagsPath = themeOptions.tagsPath || `/page-tag-list`

    return {
        basePath,
        contentPath,
        tagsPath
    }
}