/* Builds gif object */

module.exports = gif => {
    return {
        id: gif.id,
        gif: {
            url: gif.images.downsized.url,
            width: gif.images.downsized.width,
            height: gif.images.downsized.height
        },
        still: {
            url: gif.images.downsized_still.url,
            width: gif.images.downsized_still.width,
            height: gif.images.downsized_still.height
        }
    }
}