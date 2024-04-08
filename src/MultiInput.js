import React, { createRef, useState } from "react"
import { useQuery, } from "@tanstack/react-query"
import "./MultiInput.css"
import TagContainer from "./TagContainer"
import InputAddTag from "./InputAddTag"

const MultiInput = () => {
  const [tags, setTags] = useState([])
  const [searchedTags, setSearchedTags] = useState([])
  //We controlled position cursor between tags
  const [focusIndexInput, setFocusIndexInput] = useState(0)
  //Clearing input after add tag to input
  const [isClearInput, setIsClearInput] = useState(false)

  const refWrapperInput = createRef()

  const onFocusLastInput = () => {
    setFocusIndexInput(tags.length ? tags.length - 1 : 0)
  }

  const handleSearchedTags = (value) => {
    if (value) {
      const searched = data.filter((tag) => tag.name.toLowerCase().includes(value.toLowerCase()))
      setSearchedTags(searched)
    } else {
      setSearchedTags([])
    }
  }

  const onAddTag = (e, tag) => {
    e.stopPropagation()

    if (tags.length === 0) {
      setTags([{ ...tag, type: "tag" }])
    } else {
      setTags([...tags.slice(0, focusIndexInput + 1), { ...tag, type: "tag" }, ...tags.slice(focusIndexInput + 1)])
      setFocusIndexInput(focusIndexInput + 1)
    }
    setSearchedTags([])
    setIsClearInput(true)
  }

  //Request data for autocomplete
  const { isPending, data } = useQuery({
    queryKey: ["inputAutoDate"],
    queryFn: () =>
      fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete").then((res) =>
        res.json(),
      ),
  })

  if (isPending) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="multiInputWrapper" ref={refWrapperInput} onClick={onFocusLastInput}>
      <div className="multiInput">
        {Boolean(tags.length) ? (
          tags.map((tag, i) => (
            <TagContainer
              key={`${tag.id}_${i}`}
              setTags={setTags}
              focusIndexInput={focusIndexInput}
              setFocusIndexInput={setFocusIndexInput}
              setIsClearInput={setIsClearInput}
              isClearInput={isClearInput}
              handleSearchedTags={handleSearchedTags}
              index={i}
              isLastTag={tags.length - 1 === i}
              params={tag} />
          ))
        ) : (
          <>
            <InputAddTag
              isLastTag
              setTags={setTags}
              index={0}
              focusIndexInput={focusIndexInput}
              setFocusIndexInput={setFocusIndexInput}
              setIsClearInput={setIsClearInput}
              isClearInput={isClearInput}
              handleSearchedTags={handleSearchedTags} />
          </>
        )}
      </div>

      {Boolean(searchedTags.length) && (
        <div className="selectContainer">
          <ul>
            {searchedTags.map((tag, i) => (
              <li key={`${tag.id}_${i}`} onClick={(e) => onAddTag(e, tag)}>
                <span>{tag.name}</span>
                <span>value: {tag.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MultiInput
