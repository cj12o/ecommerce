const sessionIduserMap=new Map()


function setUser(id,user){
    sessionIduserMap.set(id,user)
}

function getUser(id){
    return sessionIduserMap.get(id)
}

export {getUser,setUser}