<template>
    <div class="page page-room">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {fabric} from 'fabric'
import {useCreatePoker} from '../../hooks/useCreatePoker'
import {useCreateSeat} from '../../hooks/useCreateSeat'
import emitter from '../../utils/emitter'
import {usePokerStore} from '../../stores/poker'
console.log(emitter)

const pokerStore = usePokerStore()

onMounted(() => {
    const account = ref<any>(null)
    const users = pokerStore.seatData
  const canvasMainWidth =  window.innerWidth
  const canvasMainHeight = window.innerHeight
  const canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#037204',
    width: canvasMainWidth,
    height: canvasMainHeight
  })
  const {loaded, onFlip, onTurn, onRiver} = useCreatePoker(canvas)
    canvas.on('mouse:down', (e: any) => {
      console.log(e)
      const target = e.target
      if (target && target.alias === 'seatItem' && !target.address && !account.value) {
        account.value = {
            address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a11111',
            nickName: 'TC',
            chip: 20000,
            mode: target.mode,
            seatId: target.seatId
        }
        emitter.emit('addAccount', account.value)
      }
    })
    useCreateSeat(canvas, users)
  setTimeout(() => {
    onFlip([{type: 's1'}, {type: 's2'}, {type: 's3'}])
  }, 1000)
    // function animate(klass: any) {
    //     // const staticCanvas: any = canvas.item(0)
    //     // console.log(staticCanvas, 999999)
    //     klass.animate('top', klass.get('top') === 500 ? '100' : '500', {
    //         duration: 1000,
    //         onChange: canvas.renderAll.bind(canvas),
    //         onComplete: () => {
    //             animate(klass)
    //         }
    //     })
    // }
})
</script>

<style lang="less">
.page-room {
    width: 100vw;
    height: 100vh;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
