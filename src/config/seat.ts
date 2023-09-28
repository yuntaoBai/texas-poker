type seatParamItem = {
    top: number
    left: number
}
interface seatParam {
    [key: string]: seatParamItem;
}

const {innerWidth, innerHeight} = window

export const width = 60
export const height = 80

export const seatKeys = [1, 2, 3, 4, 5, 6, 7, 8]

const seatConfig: seatParam = {
    1: {
        top: innerHeight - height - 20,
        left: (innerWidth - width)/2
    },
    2: {
        top: (innerHeight/4) * 3 - height/2,
        left: 10
    },
    3: {
        top: (innerHeight - height)/2,
        left: 10
    },
    4: {
        top: innerHeight/4 - height/2,
        left: 10
    },
    5: {
        top: 20,
        left: (innerWidth - width)/2
    },
    6: {
        top: innerHeight/4 - height/2,
        left: innerWidth - width - 10
    },
    7: {
        top: (innerHeight - height)/2,
        left: innerWidth - width - 10
    },
    8: {
        top: (innerHeight/4) * 3 - height/2,
        left: innerWidth - width - 10
    }
}

export default seatConfig
