
import {dataContext} from '@context'
import second from '@/context/'
import PopupProvider from '@context'

export default function Undoredo() {
  const {undo, redo, canUndo, canRedo}=dataContext()
  return (
    <div className='flex justify-center align-bottom'>
      <button className={`${canUndo.length===0 ? 'cursor-not-allowed opacitiy-50 bg-blue-300':'cursor-pointer bg-blue-500 hover:bg-blue-600 font-semibold'}   py-2 px-4 rounded m-2`} onClick={undo}>Undo</button>
      <button className={`${canRedo.length===0 ? 'cursor-not-allowed opacitiy-50 bg-blue-300':'cursor-pointer bg-blue-500 hover:bg-blue-600 font-semibold'}   py-2 px-4 rounded m-2`} onClick={redo}>Redo</button>
    </div>
  )
}
