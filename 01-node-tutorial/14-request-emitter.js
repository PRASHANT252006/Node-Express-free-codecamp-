const EventEmitter=require('events');

//on-listen for an event
//emit-emit an event

const customEmitter=new EventEmitter()

customEmitter.on('response',()=>{
    console.log('data received')
})
customEmitter.on('response',()=>{
    console.log('data received 1234')
})

customEmitter.on('response',(data,age)=>{
    console.log(`data received ${data} with id: ${age}`)
})
// we first listen for an event and then emit it
//there can we any number of .on(respone)
//we can also pass arguments to the event listener
customEmitter.emit('response')
customEmitter.emit('response','jhon',34)