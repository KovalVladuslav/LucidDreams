import React, { useEffect, useRef, useState } from "react"
import "./MultiInput.css"

const Tag = ({ params, index, setTags, setIsEditCategory }) => {
  const [isEdit, setIsEdit] = useState(false)

  const redInput = useRef()

  useEffect(() => {
    if (isEdit) {
      redInput.current?.focus()
      setIsEditCategory(true)
    } else {
      setIsEditCategory(false)
    }
  }, [isEdit])

  const handleSave = (e) => {
    const updatedTag = {
      ...params,
      category: e.target.value
    }

    setTags(prev => [...prev.slice(0, index), updatedTag, ...prev.slice(index + 1)])

    setIsEdit(false)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSave(e)
    }
  }

  return (
    <div className="tag">
      {params.name} | {isEdit ? (
      <input ref={redInput} onKeyUp={handleEnter} onBlur={handleSave} defaultValue={params.category} />
    ) : (
      <span onClick={() => setIsEdit(true)}>
        [{params.category}]
      </span>
    )}
    </div>
  )
}

export default Tag