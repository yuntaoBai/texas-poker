/**该方法用来绘制一个有填充色的圆角矩形 
    *@param cxt:canvas的上下文环境 
    *@param x:左上角x轴坐标 
    *@param y:左上角y轴坐标 
    *@param width:矩形的宽度 
    *@param height:矩形的高度 
    *@param radius:圆的半径 
    *@param fillColor:填充颜色 
**/
export function fillRoundRect(ctx: any, x: number, y: number, width: number, height: number, radius: number, fillColor?: string) {
    //圆的直径必然要小于矩形的宽高          
    if (2 * radius > width || 2 * radius > height) { 
        return false 
    }
    ctx.save()
    ctx.translate(x, y)
    //绘制圆角矩形的各个边  
    drawRoundRectPath(ctx, width, height, radius)
    ctx.fillStyle = fillColor || '#000' //若是给定了值就用给定的值否则给予默认值  
    ctx.fill()
    ctx.restore()
}


/**该方法用来绘制圆角矩形 
    *@param cxt:canvas的上下文环境 
    *@param x:左上角x轴坐标 
    *@param y:左上角y轴坐标 
    *@param width:矩形的宽度 
    *@param height:矩形的高度 
    *@param radius:圆的半径 
    *@param lineWidth:线条粗细 
    *@param strokeColor:线条颜色 
**/
export function strokeRoundRect(ctx: any, x: number, y: number, width: number, height: number, radius: number, lineWidth?: number, strokeColor?: string) {
    //圆的直径必然要小于矩形的宽高          
    if (2 * radius > width || 2 * radius > height) { 
        return false 
    }
    ctx.save()
    ctx.translate(x, y)
    //绘制圆角矩形的各个边  
    drawRoundRectPath(ctx, width, height, radius)
    ctx.lineWidth = lineWidth || 2 //若是给定了值就用给定的值否则给予默认值2  
    ctx.strokeStyle = strokeColor || '#000'
    ctx.stroke()
    ctx.restore()
}

export function drawRoundRectPath(ctx: any, width: number, height: number, radius: number) {
    ctx.beginPath(0)
    //从右下角顺时针绘制，弧度从0到1/2PI  
    ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
    //矩形下边线  
    ctx.lineTo(radius, height)
    //左下角圆弧，弧度从1/2PI到PI  
    ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
    //矩形左边线  
    ctx.lineTo(0, radius)
    //左上角圆弧，弧度从PI到3/2PI  
    ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
    //上边线  
    ctx.lineTo(width - radius, 0)
    //右上角圆弧  
    ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
    //右边线  
    ctx.lineTo(width, height - radius)
    ctx.closePath()
}

export function contdown(ctx: any, options: {x:number, y:number, radius:number, lineWidth:number, lineColor:string, backround:string, time: number}, angle?: number){
    const { x, y, radius, lineWidth, lineColor, backround, time } = options
    angle = angle || 0
    ctx.save()
    ctx.translate(x + radius, y + radius + 10)
    ctx.beginPath()
    ctx.globalAlpha = 0.9
    ctx.fillStyle = "#055103"
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth/4
    ctx.arc(0, 0, radius , 0, Math.PI*2)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.save()
    ctx.font= '24px Arial'
    ctx.fillText(time, 0 ,7, 40)
    //画出圆环的底色
    ctx.translate(x + radius, y + radius + 10)
    ctx.beginPath()
    ctx.strokeStyle = backround
    ctx.lineWidth = lineWidth
    ctx.arc(0, 0, radius, 0, Math.PI * 2 )
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.save()
    //画圆环
    ctx.translate(x + radius, y + radius + 10)
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.rotate(-Math.PI / 2)
    ctx.arc(0, 0, radius, 0, Math.PI/180 * angle)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.save()
    //线条开始点的圆角
    ctx.translate(x + radius, y + radius + 10)
    ctx.beginPath()
    ctx.fillStyle = lineColor
    ctx.rotate(-Math.PI / 2)
    ctx.arc(radius, 0, lineWidth/2, 0, Math.PI*2)
    ctx.lineTo(0, 0)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
    ctx.save()
    //跟随旋转的小圆点
    ctx.translate(x + radius, y + radius + 10)
    ctx.beginPath()
    ctx.fillStyle = "#ffffff"
    ctx.rotate(Math.PI / 180 * angle) //根据时间改变角度
    ctx.rotate(-Math.PI / 2)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth/4
    ctx.arc(radius, 0, lineWidth*3/8 , 0, Math.PI*2)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    //重新加载、保存默认设置，不影响下次画板
    ctx.restore()
}
