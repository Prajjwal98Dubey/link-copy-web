import { useState } from "react"
import { DELETE_IMG_ICON } from "./assets/images"

function App() {
  const [name, setName] = useState("")
  const [linkTxt, setLinkTxt] = useState("")
  const [allLinks, setAllLinks] = useState(localStorage.getItem("my-link-copy") ? JSON.parse(localStorage.getItem("my-link-copy")) : [])

  const hanleAddLink = () => {
    const newLinks = [...allLinks]
    newLinks.push({ "nameLink": name, "linkCopied": linkTxt })
    setAllLinks(newLinks)
    localStorage.setItem("my-link-copy", JSON.stringify(newLinks))
    setName("")
    setLinkTxt("")
  }
  const handleDeleteLinks=(index)=>{
    const filterData=  allLinks.filter((all,i)=>i!==index)
    const newLinks = filterData
    setAllLinks(newLinks)
    localStorage.setItem("my-link-copy", JSON.stringify(newLinks))
  }
  return (
    <>
      <div className="flex justify-center p-5 text-white font-bold text-xl">All Links at one place</div>
      <div className="flex justify-center">
        <div><input type="text" className="w-[210px] h-[45px] rounded-lg bg-gray-400 border border-gray-400 font-semibold m-1 placeholder-gray-300 p-2" placeholder="name of the link" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div>
          <input type="text" className="w-[300px] h-[45px] rounded-lg bg-gray-400 border border-gray-400 font-semibold m-1 placeholder-gray-300 p-2" placeholder="paste link" value={linkTxt} onChange={(e) => setLinkTxt(e.target.value)} />
        </div>
        <div><button className="bg-red-500 w-[60px] h-[45px] hover:bg-red-600 text-white font-semibold m-1 rounded-lg" onClick={() => hanleAddLink()}>Add</button></div>
      </div>
      <div className="flex justify-center ">
        {localStorage.getItem("my-link-copy") ?
          <div>
            {allLinks.map((obj, index) => (
              <div key={index} className="flex">
                <a key={index} href={obj.linkCopied} target="_blank"><div className="max-w-max max-h-max hover:opacity-75 cursor-pointer rounded-lg border border-gray-400 m-2">
                  <div className="text-sm font-semibold text-gray-400 p-1 m-1">
                    {obj.nameLink}
                  </div>
                  <div className="text-xl font-bold p-1 m-1 text-blue-400">{obj.linkCopied}</div>
                </div>
                </a>
                <div className="h-[100px] flex items-center"><img src={DELETE_IMG_ICON} alt="loading" className="cursor-pointer" onClick={()=>handleDeleteLinks(index)} /></div>
              </div>

            ))}
          </div>
          : <div className="text-white font-semibold text-xl p-2">No links added.</div>}
      </div>

    </>
  )
}

export default App
