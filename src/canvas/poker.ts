import { fabric } from 'fabric'
import { render } from 'vue'
import pokerParams from '../config/poker'
import PokerItem from './pokerItem'

type optionsParams = {
    width: number
    height: number
    image: object
    pokers: object[]
}

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        this.width = options.width
        this.height = options.height
        this.selectable = false
        this.image = options.image
        this.pokers = options.pokers || []
        this.pokerItems = []
        const width =  document.body.clientWidth - 160
        this.scale = (width/5)/this.width
    },
    _render: function(ctx: any) {
        this.pokerItems = []
        this.pokers.forEach((item: any, index: number) => {
            this.pokerItems.push(this.renderItem(item, index))
        })
    },
    renderItem(item: any, index: number) {
        const pokerItem = new PokerItem({
            width: this.width,
            height: this.height,
            top: document.body.clientHeight/2 - 80,
            left: 80 + (this.pokers.length > 3 ? (this.width * this.scale) * index : 0),
            cropX: pokerParams[item.type].cropX,
            cropY: pokerParams[item.type].cropY,
            type: item.type,
            alias: 'poker'
        }, this.image).scale(this.scale)
        if (this.pokers.length < 4) {
            pokerItem.animate('left', 80 + (this.width * this.scale) * index, {
                duration: 500,
                onChange: this.canvas.renderAll.bind(this.canvas),
                // onComplete: () => {}
            })
        }
        this.canvas.add(pokerItem)
        return pokerItem
    },
    addPokerItem(item: []) {
        this.pokers = this.pokers.concat(item)
        this._render()
    },
    clearPokerItem() {
        this.pokers = []
        console.log(this.canvas)
        const objects = this.canvas.getObjects()
        objects.forEach((item: any) => {
            if (item.alias === 'poker') {
                this.canvas.remove(item)
            }
        })
        // this.pokerItems.forEach((item: any) => {
        //     console.log(item)
        //     item.remove()
        // })
    }
})