import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pw-drag-drop-test-client';

  items = [{ name: "Egg" }, { name: "Oil" }, { name: "Banana" }];

}
