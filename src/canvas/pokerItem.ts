import { fabric } from 'fabric'

type optionsParams = {
    width: number
    height: number
    top: number
    left: number
    cropX: number
    cropY: number
    type: string
    alias: string
}
export default fabric.util.createClass(fabric.Image, {
    objectCaching: false,
    initialize: function(options: optionsParams, image: any) {
        this.callSuper('initialize', options)
        const {width, height, top, left, cropX, cropY, type, alias} = options
        this.selectable = false
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.cropX = cropX
        this.cropY = cropY
        this.image = image
        this.imageWidth = this.image.width
        this.imageHeight = this.image.height
        this.type = type
        this.alias = alias || 'poker'
    },
    _render: function(ctx: any) {
        ctx.drawImage(
            this.image, 
            this.cropX, this.cropY, 
            this.width, this.height, 
            -this.width/2, -this.width/2, 
            this.width, this.height
        )
    }
})