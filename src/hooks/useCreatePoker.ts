import {fabric} from 'fabric'
import pokerParams from '../config/poker'
import Poker from '../canvas/poker'
import {ref} from 'vue'

export const  useCreatePoker = (canvas: any) => {
    const pokerItems = ref<any>(null)
    const loaded = ref(false)
    // const params: object = pokerParams[type]
    const images: any = new Image()
    images.src = '../src/assets/images/poker.png'
    images.onload = (() => {
        pokerItems.value = new Poker({
            width: 96,
            height: 140,
            image: images,
            pokers: []
        })
        canvas.add(pokerItems.value)
        loaded.value = true
    })

    const onFlip: (p: { type: string }[]) => void = (p: { type: string }[]) => {
        pokerItems.value.addPokerItem(p)
    }

    const onTurn: (p: { type: string }) => void = (p: { type: string }) => {
        pokerItems.value.addPokerItem([p])
    }

    const onRiver: (p: { type: string }) => void = (p: { type: string }) => {
        pokerItems.value.addPokerItem([p])
    }

    return {
        loaded,
        onFlip,
        onTurn,
        onRiver
    }
}
