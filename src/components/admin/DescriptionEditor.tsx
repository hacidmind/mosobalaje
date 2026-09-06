'use client';

import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { descriptionToHtml } from '@/src/lib/description-format';

export default function DescriptionEditor({ initialValue, onChange }: { initialValue: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false, code: false, codeBlock: false, horizontalRule: false }),
    ],
    // This component only mounts after the client opens the vehicle modal.
    immediatelyRender: true,
    content: descriptionToHtml(initialValue),
    editorProps: {
      attributes: { id: 'vehicle-description', role: 'textbox', 'aria-label': 'Vehicle description', 'aria-multiline': 'true', class: 'vehicle-description min-h-48 max-h-80 overflow-y-auto p-4 text-sm outline-none' },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  });
  const state = useEditorState({ editor, selector: ({ editor }) => editor ? {
    bold: editor.isActive('bold'), italic: editor.isActive('italic'), underline: editor.isActive('underline'),
    bullet: editor.isActive('bulletList'), ordered: editor.isActive('orderedList'), quote: editor.isActive('blockquote'),
    heading: editor.isActive('heading', { level: 2 }) ? '2' : editor.isActive('heading', { level: 3 }) ? '3' : 'paragraph',
    undo: editor.can().undo(), redo: editor.can().redo(), count: editor.getText().length,
  } : null });

  if (!editor || !state) return <div role="status" className="skeleton h-48"> <span className="sr-only">Loading description editor</span></div>;

  const actions = [
    { label: 'Bold', text: 'B', active: state.bold, run: () => editor.chain().focus().toggleBold().run(), style: 'font-bold' },
    { label: 'Italic', text: 'I', active: state.italic, run: () => editor.chain().focus().toggleItalic().run(), style: 'italic' },
    { label: 'Underline', text: 'U', active: state.underline, run: () => editor.chain().focus().toggleUnderline().run(), style: 'underline' },
    { label: 'Bullet list', text: '• Bullets', active: state.bullet, run: () => editor.chain().focus().toggleBulletList().run() },
    { label: 'Numbered list', text: '1. List', active: state.ordered, run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: 'Quote', text: 'Quote', active: state.quote, run: () => editor.chain().focus().toggleBlockquote().run() },
  ];

  return <div className="overflow-hidden rounded-xl border border-stone-300 bg-white focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20">
    <div role="group" aria-label="Description formatting" className="flex flex-wrap items-center gap-1 border-b border-stone-200 bg-stone-50 p-2">
      <select aria-label="Text style" value={state.heading} onChange={event => {
        if (event.target.value === 'paragraph') editor.chain().focus().setParagraph().run();
        else editor.chain().focus().setHeading({ level: Number(event.target.value) as 2 | 3 }).run();
      }} className="rounded-md border border-stone-200 bg-white px-2 py-2 text-xs">
        <option value="paragraph">Paragraph</option><option value="2">Title</option><option value="3">Subheading</option>
      </select>
      {actions.map(action => <button key={action.label} type="button" aria-label={action.label} title={action.label} aria-pressed={action.active} onMouseDown={event => event.preventDefault()} onClick={action.run} className={`min-h-9 min-w-9 rounded-md px-2 text-xs ${action.style || ''} ${action.active ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-200'}`}>{action.text}</button>)}
      <button type="button" disabled={!state.undo} onClick={() => editor.chain().focus().undo().run()} className="rounded-md px-2 py-2 text-xs hover:bg-stone-200 disabled:opacity-30">Undo</button>
      <button type="button" disabled={!state.redo} onClick={() => editor.chain().focus().redo().run()} className="rounded-md px-2 py-2 text-xs hover:bg-stone-200 disabled:opacity-30">Redo</button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="rounded-md px-2 py-2 text-xs hover:bg-stone-200">Clear formatting</button>
    </div>
    <EditorContent editor={editor} />
    <div className="flex justify-between gap-4 border-t border-stone-100 px-3 py-2 text-xs text-stone-500"><span>Select text to format it. Enter starts a new paragraph.</span><span className="shrink-0">{state.count} characters</span></div>
  </div>;
}
