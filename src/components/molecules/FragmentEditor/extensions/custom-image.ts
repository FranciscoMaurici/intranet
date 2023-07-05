import { mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'

export default Image.extend({
  name: 'custom-image',

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      size: {
        default: 'small',
      },
      float: {
        default: 'none',
      },
    }
  },

  addCommands() {
    return {
      setImage:
        options =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
      setImageAttributes:
        options =>
        ({ commands }) =>
          commands.updateAttributes(this.name, options),
    }
  },

  renderHTML({ node, HTMLAttributes }) {
    HTMLAttributes.class = ' custom-image-' + node.attrs.size
    HTMLAttributes.class += ' custom-image-float-' + node.attrs.float
    HTMLAttributes.onClick = `    
    if(document.getElementById("${HTMLAttributes.src}") && 
      !document.getElementById("editorToolbar"))
    {
      document.getElementById("${HTMLAttributes.src}").style.display = "flex";
      document.body.style.overflowY="hidden";
    }`

    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },
})
