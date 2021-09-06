import { Component } from '@angular/core';
import { UpdateModel } from 'projects/pw-drag-drop-good/src/lib/directives/strategies/ReorderElementsStrategy/TryNotifyClientStrategy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pw-drag-drop-test-client';

  items = [{ name: "Egg" }, { name: "Oil" }, { name: "Banana" }];

  containerItems: any[] = [{ name: "Fish" }, { name: "Mozarella" }, { name: "Ketchup" }];

  onAddElementCalled(item: any) {


    var index = this.items.indexOf(item);

    if (index == -1)
      return;

    this.items.splice(index, 1);

    this.containerItems.push({ name: item.name });
  }

  onUpdateElementCalled(item: UpdateModel) {
    console.log(item.item);

    var oldIndex  = this.containerItems.indexOf(item.item);
    var newIndex = item.newIndex;

    this.containerItems.splice(oldIndex, 1);
    this.containerItems.splice(newIndex, 0, item.item);

    console.log(oldIndex);
  }

  

}
