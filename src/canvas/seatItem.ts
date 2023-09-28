import { fabric } from 'fabric'
import seatParams from '../config/seat'
import {fillRoundRect, strokeRoundRect, contdown} from '../utils/canvas'

type optionsParams = {
    width: number
    height: number
    top: number
    left: number,
    nickName: string,
    status?: number
    chip?: number,
    seatId: number,
    address: string
    mode: number
}

const statusText = ['', '让牌', '跟注', '加注', '弃牌']

export default fabric.util.createClass(fabric.Object, {
    objectCaching: false,
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        const {width, height, top, left, nickName, status, chip, seatId, address, mode} = options
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.nickName = nickName
        this.selectable = false
        this.alias = 'seatItem'
        this.status = status || 0 // 0 初始 1 让牌 2 跟注 3 加注 4 弃牌
        this.chip = chip || 0
        this.seatId = seatId
        this.address = address
        this.mode = mode
        this.contdown = false
        this._angle = 0
        this.time = 15

    },
    _render: function(ctx: any) {
        const x = -this.width/2
        const y = -this.height/2
        if (this.address) {
            this.renderItem(ctx, x, y)
        } else {
            this.renderAddItem(ctx, x, y)
        }
    },
    renderAddItem(ctx: any, x: number, y: number) {
        strokeRoundRect(ctx, x, y, this.width, this.width, 3, 1, '#055103')
        ctx.fillStyle = '#055103'
        ctx.fillRect(x + (this.width - 24)/2, y + (this.width - 2)/2, 24, 2)
        ctx.fillRect(x + (this.width - 2)/2, y + (this.width - 24)/2, 2, 24)
    },
    renderItem(ctx: any, x: number, y: number) {
        fillRoundRect(ctx, x, y, this.width, this.height, 3, '#025103')
        strokeRoundRect(ctx, x, y, this.width, this.height, 3, 2, '#055103')
        ctx.font= '14px Arial'
        ctx.fillStyle = '#ccc'
        ctx.textAlign = 'center'
        ctx.fillText(statusText[this.status], 0, y + 16, this.width)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.fillRect(x, y + 22, this.width, this.height - 40)
        ctx.fillStyle = '#ffc000'
        ctx.fillText(this.chip, 0, y + this.height - 4, this.width)
        ctx.fillStyle = '#fff'
        ctx.font= '18px Arial'
        ctx.fillText(this.nickName, 0, 10, this.width)
        if (this.contdown) {
            contdown(ctx, {
                x,
                y,
                radius: 30,
                lineWidth: 4,
                lineColor: '#f60',
                backround: '#ccc',
                time: this.time
            }, this._angle)
        }
    },
    accountPlay(account: any, count: number) {
        return new Promise((resolve) => {
            const key = this.mode - count  < 1 ? 8 +  this.mode - count :  this.mode - count
            this.animate({
                left: seatParams[key].left,
                top: seatParams[key].top
            }, {
                duration: 500,
                onChange: this.canvas.renderAll.bind(this.canvas),
                onComplete: () => {
                    this.mode = key
                    if (this.seatId === account.seatId) {
                        this.nickName = account.nickName
                        this.address = account.address
                        this.chip = account.chip
                    }
                    resolve(this)
                }

            })
        })
    },
    userPlay(user: any) {
        this.nickName = user.nickName
        this.address = user.address
        this.chip = user.chip
    },
    setCondown() {
        const time = this.time
        let count = 0
        this.contdown = true
        this.animate('_angle', 360, {
            duration: time * 1000,
            onChange: (e:number) => {
                const num = parseInt(((time / 360) * e))
                if (count !== num) {
                    count = num
                    console.log(count, 66666666)
                    this.time = time - count
                }
                this.canvas.renderAll()
            },
            onComplete: () => {
                this.contdown = false
                console.log(4444444)
            }

        })
    }
})