"use client";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback, useState } from "react";
import InputComp from "./InputComp";
import { Bold, ImagePlus, Italic, List } from "lucide-react";

export default function ListProductComp() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
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
      return <>something went wrong</>;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const resposne = await res.json();
      if (resposne.success === true) {
        setImageUrl(resposne.url);
      }
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

  const bold = () => {
    if (!editor) {
      return <div>No editor found.</div>;
    }
    editor.chain().focus().toggleBold().run();
  };

  const italic = () => {
    if (!editor) {
      return <div>No editor found.</div>;
    }

    editor.chain().focus().toggleItalic().run();
  };

  const list = () => {
    if (!editor) {
      return <div>No editor found.</div>;
    }
    editor.chain().focus().toggleBulletList().run();
  };

  const image = useCallback(() => {
    if (!editor) {
      return <div>No editor found.</div>;
    }

    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  if (!editor) {
    return null;
  }

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          discountPrice,
          content,
          imageUrl,
        }),
      });

      const resposne = await res.json();
      console.log(resposne);
      
      
    } catch (error) {
      console.log(error);
    }
  };

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

      <div className="mt-2 space-x-1">
        <button
          className="bg-black text-white rounded px-1"
          onClick={bold}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold />
        </button>
        <button
          className="bg-black text-white rounded px-1"
          onClick={italic}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Italic />
        </button>
        <button
          className="bg-black text-white rounded px-1"
          onClick={list}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
        >
          <List />
        </button>
        <button className="bg-black text-white rounded px-1" onClick={image}>
          <ImagePlus />
        </button>
      </div>

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
      <div>
        <button
          onClick={submit}
          className="bg-blue-500 px-4 py-2 rounded text-xl font-semibold text-white hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
