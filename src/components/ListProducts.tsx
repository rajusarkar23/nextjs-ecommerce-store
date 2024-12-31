"use client";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import InputComp from "./InputComp";
import ButtonComp from "./Button";

export default function ListProductComp() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };
  const handlePriceChange = (value: string) => {
    setPrice(value);
  };
  const handleDiscountPriceChange = (value: string) => {
    setDiscountPrice(value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
        return <>
        something went wrong
        </>
    };

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("formdata:", formData);

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData
      });

      const resposne = await res.json();
      console.log(resposne);
    } catch (error) {
      console.log(error);
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, Image],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="px-24 mt-9 space-y-2">
      <InputComp
        autofocus={true}
        onChange={handleTitleChange}
        label="Title"
        type="text"
        value={title}
      />
      <EditorContent editor={editor} />

      <div className="flex flex-col">
        <label>Select image</label>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <InputComp
        autofocus={false}
        label="Price"
        onChange={handlePriceChange}
        type="text"
        value={price}
      />
      <InputComp
        autofocus={false}
        label="Discount price"
        onChange={handleDiscountPriceChange}
        type="text"
        value={discountPrice}
      />
      <ButtonComp />
    </div>
  );
}
