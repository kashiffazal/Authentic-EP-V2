import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import './styles.less';

//@ Doc URL : https://www.tiny.cloud/docs/tinymce/6/react-pm-host/

class RichTextEditor extends Component {
  state = {
    // apiKey: 'zvk0g5o1ku41uigk1i66of6md5s0x4x6jpm32tpfsnobfkgp',
    pluginAndToolbar: {
      0: {//@For Email Template
        editorPlugins: ['quickbars', 'code', 'codesample', 'table', 'directionality', 'emoticons', 'fullscreen', 'help', 'image', 'insertdatetime', 'link', 'lists', 'advlist', 'media',
          'nonbreaking', 'pagebreak', 'preview', 'searchreplace', 'visualblocks', 'visualchars', 'wordcount'],
        editorToolbar: 'bold italic underline strikethrough subscript superscript hr | ' +
          'blocks | fontfamily | fontsize | ' +
          'backcolor forecolor removeformat | ' +
          'numlist bullist outdent indent ltr rtl visualchars blockquote| ' +
          'alignleft aligncenter alignright alignjustify alignnone | lineheight | table |   ' +
          'image link unlink emoticons | fullscreen   code preview searchreplace| ' +
          '     '
        // 'copy cut paste pastetext undo redo quicktable newdocument remove selectall styles language visualaid media nonbreaking pagebreak codesample insertdatetime openlink print visualblocks  wordcount quickimage  help '
      },
      // 0: {
      //   editorPlugins: ['image', 'advimage', 'table', 'hr', 'advhr', 'link', 'advlink', 'autolink', 'lists', 'advlist', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
      //   editorToolbar: 'bold italic underline removeformat | image table hr| link unlink | bullist numlist | alignleft aligncenter alignright alignjustify | formatselect blocks fontfamily fontsize | forecolor',
      // },
      1: {
        editorPlugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
        editorToolbar: 'bullist numlist | bold italic underline | alignleft aligncenter alignright',
      },
      2: {
        editorPlugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
        editorToolbar: 'fontfamily fontsize | bullist numlist | bold italic underline | alignleft aligncenter alignright',
      },
      3: {
        editorPlugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
        editorToolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      },
      4: {
        editorPlugins: ['preview', 'fullpage', 'directionality', 'fullscreen', 'image', 'link', 'table', 'charmap', 'hr', 'insertdatetime', 'advlist', 'lists', 'wordcount'],
        editorToolbar: 'formatselect | bold italic underline removeformat strikethrough forecolor | image table charmap hr insertdatetime | link unlink | numlist bullist | alignleft aligncenter alignright alignjustify | fontfamily | fontsize  | preview fullpage directionality fullscreen wordcount',
      }
    }//End plugins and tools variables
  }//End state

  render() {
    const st = this.state;
    const pr = this.props;
    return (
      <div className={`rich-text-editor-container ${pr.className ? pr.className : ''}`}>
        <Editor
          tinymceScriptSrc={`${process.env.PUBLIC_URL}/lib/tinymce/tinymce.min.js`}
          // apiKey={st.apiKey}
          initialValue={pr.value}
          init={{
            height: pr.height ? pr.height : 480,
            menubar: pr.menubar ? pr.menubar : false,
            plugins: st.pluginAndToolbar[pr.toolType ? pr.toolType : '0'].editorPlugins,
            toolbar: st.pluginAndToolbar[pr.toolType ? pr.toolType : '0'].editorToolbar,
            font_size_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 9pt 20pt 21pt 22pt 23pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            quickbars_selection_toolbar: 'bold italic underline | backcolor forecolor removeformat | alignleft aligncenter alignright alignjustify alignnone | link unlink',
            quickbars_insert_toolbar: false,
            // link_default_target: '_blank',
            // link_assume_external_targets: true,
            link_class_list: [
              { title: 'None', value: '' },
              { title: 'External Link', value: 'ext_link' },
              { title: 'Internal Support Link', value: 'int_sup_link' },
              { title: 'Internal Marketing Link', value: 'int_mark_link' },
              { title: 'Other Internal Link', value: 'int_other_link' }
            ],
            // lists_indent_on_tab: false,
            //@ Required for 'language' toolbar
            // content_langs: [
            //   { title: 'English', code: 'en' },
            //   { title: 'Spanish', code: 'es' },
            //   { title: 'French', code: 'fr' },
            //   { title: 'German', code: 'de' },
            //   { title: 'Portuguese', code: 'pt' },
            //   { title: 'Chinese', code: 'zh' }
            // ],
            nonbreaking_force_tab: true,//Allow space by pressing Tab Key
            selector: 'textarea',
            skin: "tinymce-5",//oxide,oxide-dark,tinymce-5,tinymce-5-dark
            // content_css: 'dark',
            content_css: [`${process.env.PUBLIC_URL} /css/tynimac-custom-classes.css`],//'dark' copuld be add into array
            // themes: "silver",//default : 'silver'
            // inline: true,
            resize: pr.resize ? pr.resize : false,
            statusbar: pr.statusbar,
            branding: false,
            elementpath: pr.elementpath ? pr.elementpath : true, // p > strong > etc...

            toolbar_location: 'top',// auto,top,bottom
            toolbar_mode: 'sliding', //floating,sliding,scrolling,wrap
            toolbar_sticky: true,//true,false
          }}
          onChange={(e) => pr.onChange && pr.onChange(e.target.getContent())}
        />
      </div>
    )//End return
  }//End render
}//End class
export default RichTextEditor;