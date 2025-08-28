import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [FormsModule, QuillModule]
})
export class QuillEditorComponent implements ControlValueAccessor {
  content: string = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'direction': 'rtl' }, { 'direction': 'ltr' }],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  writeValue(obj: any): void {
    this.content = typeof obj === 'string' ? obj : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleContentChange(event: any) {
    this.content = event.html || '';
    const cleaned = this.content.replace(/&nbsp;/g, ' ');
    console.log('HTML content:', cleaned);
    this.onChange(this.content);
  }
}
