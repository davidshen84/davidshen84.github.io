import {Component, OnInit} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {
  text = `# Default

Default content

## Table

a|b
---|---
1|2

  `;

  constructor(private _titleService: TitleService) {
  }

  ngOnInit() {
    this._titleService.setTitle('Markdown Editor');
  }

}
