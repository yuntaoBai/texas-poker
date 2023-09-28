import { fabric } from 'fabric'
import seatParams, {width, height, seatKeys} from '../config/seat'
import SeatItem from './seatItem'

type optionsParams = {
    users: object[],
    account?: object
}

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        this.selectable = false
        this.users = options.users
        this.account = options.account
        this.seatObjects = []
    },
    getAccountIndex() {
        let accountIndex = 0
        if (this.account && this.account.address) {
            this.users.forEach((item: any, index: number) => {
                if (item.address === this.account.address) {
                    accountIndex = index
                }
            })
        }
        
        return accountIndex
    },
    _render: function(ctx: any) {
        const seatObjects: any[] = []
        seatKeys.forEach((item, index) => {
            const top = seatParams[item].top
            const left =  seatParams[item].left
            const accountIndex = this.getAccountIndex()
            const userIndex = (index + accountIndex) > 7 ? (index + accountIndex) - 8 :  index + accountIndex
            const {nickName, chip, status, seatId, address} = this.users[userIndex]
            const seatItem = new SeatItem({
                width,
                height,
                top,
                left,
                nickName,
                chip,
                status,
                seatId,
                address,
                mode: item
            })
            seatObjects.push(seatItem)
            this.canvas.add(seatItem)
        })
        this.seatObjects = seatObjects
        console.log(this.seatObjects)
    },
    createAccount(account: any) {
        this.seatObjects.forEach((item: any) => {
            item.accountPlay(account, account.mode - 1)
        })
    },
    createUser(user: any) {
        this.seatObjects.forEach((item: any) => {
            if (item.seatId === user.seatId) {
                item.userPlay(user)
                item.setCondown()
            }
        })
    }
})