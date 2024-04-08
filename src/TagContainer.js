import React, { useState } from "react"
import "./MultiInput.css"
import InputAddTag from "./InputAddTag"
import Tag from "./Tag"

const TagContainer = ({
               isLastTag,
               focusIndexInput,
               setTags,
               params,
               isClearInput,
               setFocusIndexInput,
               index,
               setIsClearInput,
               handleSearchedTags
             }) => {
  const [isEditCategory, setIsEditCategory] = useState(false)


  return (
    <div className="wrapperTag" onClick={e => e.stopPropagation()} style={{ width: isLastTag && "100%" }}>
      {params.type === "tag" ? (
        <Tag setIsEditCategory={setIsEditCategory} params={params} setTags={setTags} index={index}/>
      ) : (
        <span className='operation'>{params.value}</span>
      )}

      <InputAddTag
        isEditCategory={isEditCategory}
        isLastTag={isLastTag}
        setTags={setTags}
        setFocusIndexInput={setFocusIndexInput}
        focusIndexInput={focusIndexInput}
        index={index}
        setIsClearInput={setIsClearInput}
        isClearInput={isClearInput}
        handleSearchedTags={handleSearchedTags}
      />
    </div>
  )
}

export default TagContainer