class Promise {
  constructor(pCallBack) { //promise receives a callback function as it's argument
      let status = "pending"
      let result = null
      this.pCallBack = pCallBack;
      let resolveCallBack = (value)=> { 
        this.status = 'fulfilled'
        this.result=value
      } //I made my own resolve and reject
      let rejectCallBack = (value)=> {
        this.status = 'rejected' 
        this.result=value 
      }
      pCallBack(resolveCallBack,rejectCallBack)// the callback is called from here
  }
  then = (thenCallBack) => {
    thenCallBack(this.result)
    return this
  }
  heyTry = () => {
    console.log('hey dpaul')
    return this
  }
}
// ###################
let done = !true
const p = new Promise((resolve, reject)=>{ //Its arguments resolve and reject are callbacks provided by JavaScript itself
    if(done){
      const res = 'success'
      resolve(res)
    }
    else{
      const err = 'error';
      reject(err)
    }
      
})
p.then(ok => {
  console.log(ok)
}).heyTry()