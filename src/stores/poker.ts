import { defineStore } from 'pinia'

type seatItem = {
    address?: string
    nickName?: string
    chip?: number
    status?: number
    seatId: number
}

export const usePokerStore = defineStore('poker', {
    state: () => {
        return {
            roomStatus: 0, // 0 未开始 1 已开始 2 已结束
            pokerStatus: 0, // 0 开始 1 发牌 2 翻前（Pre-flop） 3 翻牌圈（Flop round） 4 专牌圈（Turn round）5 河牌圈（River round）
            seatData: [
                {seatId: 1},
                {seatId: 2},
                {seatId: 3},
                {seatId: 4},
                {seatId: 5},
                {seatId: 6},
                {seatId: 7},
                {seatId: 8}
            ]
        }
    },
    actions: {
        setSeatUser(seatId: number, user: seatItem) {
            this.seatData = this.seatData.map((item: seatItem) => {
                if (item.seatId === seatId) {
                    item.address = user.address
                    item.nickName = user.nickName
                    item.chip = user.chip
                    item.status = user.status
                }
                return item
            })
        }
    }
})