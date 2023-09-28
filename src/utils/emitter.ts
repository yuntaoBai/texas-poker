import Emitter from 'fbemitter'

const emitter = new Emitter.EventEmitter()

export default {
    on: function(eventType: string, callback: object) {
        return emitter.addListener(eventType, callback);
    },
    //触发事件
    emit: function(eventType: string, ...args: any[]) {
        emitter.emit.apply(emitter, arguments);
    },
	// 取消事件订阅
	remove: function(eventType: string) {
    	emitter.removeAllListeners(eventType);
	}
}