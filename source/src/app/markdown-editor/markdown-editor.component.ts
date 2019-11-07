import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../title.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MathJaxDirective } from 'ngx-mathjax';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit, OnDestroy {
  text = `# Default

Default content

## Table

a|b
---|---
1|2

`;
  textControl = new FormControl(this.text);
  @ViewChild('mdComponent', {read: MathJaxDirective, static: true})
  mathjax: MathJaxDirective;
  private textChangeSubscription: Subscription;

  constructor(titleService: TitleService) {
    titleService.setTitle('Markdown Editor');
  }

  ngOnInit() {
    this.textChangeSubscription = this.textControl.valueChanges.subscribe(value => {
      this.text = value;
      setTimeout(() => this.mathjax.MathJaxTypeset(), 0);
    });
  }

  ngOnDestroy(): void {
    this.textChangeSubscription.unsubscribe();
  }

}
