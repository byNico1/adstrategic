const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose()
  }
  return (
    <div
      className="fixed inset-0 z-50  flex  items-center justify-center bg-black bg-opacity-25 backdrop:blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="mx-auto mt-4 flex w-11/12 flex-col sm:w-[600px]">
        <button
          className="mb-4 flex h-6 w-6 items-center justify-center place-self-end rounded-full bg-black p-5 text-xl text-white"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="rounded bg-white p-2">{children}</div>
      </div>
    </div>
  )
}

export default Modal
