import {Component} from '@angular/core';

@Component({
  selector: 'app-linear-loader',
  template: `
    <div class="indeterminate-progress-bar">
      <div class="colors"></div>
    </div>
  `,
  styleUrls: ['./linear-loader.component.scss']
})
export class LinearLoaderComponent {
}
