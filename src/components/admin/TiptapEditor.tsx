"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { postService } from "@/lib/services/post.service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-700 underline",
        },
      }),
      Underline,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4 text-slate-800",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await postService.uploadImage(formData);
          if (response.success && response.data?.url) {
            editor?.chain().focus().setImage({ src: response.data.url }).run();
          } else {
            toast({
              title: "Upload failed",
              description: response.message || "Failed to upload image",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Upload failed",
            description: "Failed to upload image",
            variant: "destructive",
          });
        }
      }
    };
    input.click();
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    isActive,
    onClick,
    icon: Icon,
    disabled,
  }: {
    isActive: boolean;
    onClick: () => void;
    icon: React.ElementType;
    disabled?: boolean;
  }) => (
    <Button
      size="sm"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50",
        isActive && "bg-blue-100 text-blue-700 border-2 border-blue-200",
      )}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b-2 border-slate-200 bg-slate-50/50">
        <ToolbarButton
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
        />
        <ToolbarButton
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
        />
        <ToolbarButton
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          icon={Strikethrough}
        />
        <ToolbarButton
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
        />

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <ToolbarButton
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
        />
        <ToolbarButton
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
        />
        <ToolbarButton
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          icon={Code}
        />

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <Button
          size="sm"
          variant="ghost"
          onClick={addLink}
          className="h-8 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={addImage}
          className="h-8 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}