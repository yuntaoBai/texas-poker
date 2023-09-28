import Seat from '../canvas/seat'
import emitter from '../utils/emitter'

export async function useCreateSeat(canvas: any, users: object[]) {
    const rect: any = await new Promise((resolve, reject) => {
        const userSeat = new Seat({
            users,
            account: {
                address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a1125D0'
            }
        })
        resolve(userSeat)
    })
    canvas.add(rect)
    emitter.on('addAccount', (account: object) => {
        rect.createAccount(account)
    })
    setTimeout(() => {
        rect.createUser({
            address: 'sdfsdfsdf',
            nickName: 'MCD',
            seatId: 4,
            chip: 5000
        })
        rect.createUser({
            address: 'sdfsdfsdf',
            nickName: 'EGT',
            seatId: 7,
            chip: 1200
        })
    }, 100)
    return rect
}