import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import SignaturePad from 'signature_pad';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signature-input.component.html',
  styleUrls: ['./signature-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureInputComponent),
      multi: true
    }
  ]
})
export class SignatureInputComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;
  private pendingValue: string | null = null;

  @Input() disabled: boolean = false;
  hasSignature = false;

  private onChange = (_: any) => { };
  private onTouched = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    this.signaturePad = new SignaturePad(canvas);

    if (this.disabled) {
      this.signaturePad.off(); // מבטל אירועים אם במצב קריאה בלבד
    }

    if (this.pendingValue) {
      this.setImageFromDataUrl(this.pendingValue);
      this.pendingValue = null;
    }

    this.signaturePad.addEventListener?.('endStroke', () => {
      if (this.disabled) return;
      const data = this.signaturePad.toDataURL();
      this.hasSignature = !this.signaturePad.isEmpty();
      this.onChange(data);
      this.cdr.detectChanges();
    });
  }

  writeValue(value: string): void {
    if (!value) return;

    if (this.signaturePad) {
      this.setImageFromDataUrl(value);
    } else {
      this.pendingValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (this.signaturePad) {
      if (this.disabled) {
        this.signaturePad.off();
      } else {
        this.signaturePad.on();
      }
    }

    this.cdr.detectChanges();
  }

  clear(): void {
    if (this.disabled) return;

    this.signaturePad.clear();
    this.hasSignature = false;
    this.onChange(null);
    this.cdr.detectChanges();
  }

  private setImageFromDataUrl(value: string) {
    const image = new Image();
    image.src = value;
    image.onload = () => {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
        ctx.drawImage(image, 0, 0);
        this.hasSignature = true;
        this.cdr.detectChanges();
      }
    };
  }
}
