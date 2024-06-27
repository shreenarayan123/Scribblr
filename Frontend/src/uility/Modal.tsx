


interface Props{
    children:React.ReactNode,
    modal:boolean,
    setModal:React.Dispatch<React.SetStateAction<boolean>>

}
export const Modal =({children, modal, setModal }:Props)=>{
    return (
        <>
        <div onClick={()=>setModal(false)} className={`bg-white/50 fixed inset-0 z-10 ${modal ? "visible opacity-100" :"invisible opacity-0"} transition-all duration-500`}></div>
        {children}
        </>
    )
}