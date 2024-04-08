import React, { useEffect, useRef, useState } from "react"
import "./MultiInput.css"

const InputAddTag = ({
                       isLastTag,
                       setTags,
                       focusIndexInput,
                       setFocusIndexInput,
                       index,
                       setIsClearInput,
                       handleSearchedTags,
                       isClearInput,
                       isEditCategory
                     }) => {
  const [text, setText] = useState("")

  const refInput = useRef()

  useEffect(() => {
    if (focusIndexInput === index) {
      refInput.current?.focus()
    }
  }, [focusIndexInput])

  useEffect(() => {
    document.addEventListener("keydown", handleClickRemove)
    return () => {
      document.removeEventListener("keydown", handleClickRemove)
    }
  }, [text, focusIndexInput, isEditCategory])

  useEffect(() => {
    if (isClearInput) {
      setText("")
      setIsClearInput(false)
    }
  }, [isClearInput])

  const handleClickRemove = (event) => {
    if (event.key === "Backspace" && text.length === 0 && index === focusIndexInput && !isEditCategory) {
      setTags(prev => prev.filter((tag, i) => i !== index))
      setFocusIndexInput(prev => prev ? prev - 1 : 0)
    }
  }

  const handleInput = (e) => {
    const { value } = e.target

    const isOperators = value.trimStart().match(/^[\+|\-|\^|\*|\(|\)|\/]\s/i)

    if (isOperators) {
      const operation = {
        type: "operation",
        value: value.trim()
      }

      setTags(prev => [...prev.slice(0, focusIndexInput + 1), operation, ...prev.slice(focusIndexInput + 1)])
      setFocusIndexInput(prev => prev + 1)
      setText("")
      return
    }

    setText(value)

    handleSearchedTags(value)
  }

  const handleOnFocus = () => {
    setFocusIndexInput(index)
  }


  return (
    <input
      ref={refInput}
      onFocus={handleOnFocus}
      style={{ width: isLastTag ? "100%" : text.length ? text.length * 10 : 5 }}
      onChange={handleInput}
      value={text}
      className="inputAddTag"
    />
  )
}

export default InputAddTag