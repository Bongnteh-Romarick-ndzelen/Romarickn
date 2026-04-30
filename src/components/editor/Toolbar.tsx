
'use client';

import { type Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Link,
  Image,
} from 'lucide-react';
import { useCallback } from 'react';

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="px-4 py-3 rounded-t-lg border border-slate-700 bg-slate-800/50 flex justify-between items-center">
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive('italic')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive('underline')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive('strike')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive('heading', { level: 2 })
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive('bulletList')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive('orderedList')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive('blockquote')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={
            editor.isActive('codeBlock')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setLink();
          }}
          className={
            editor.isActive('link')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 p-2'
          }
        >
          <Link className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            addImage();
          }}
          className="text-sky-400 p-2"
        >
          <Image className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className="text-sky-400 p-2 rounded-lg"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className="text-sky-400 p-2 rounded-lg"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
