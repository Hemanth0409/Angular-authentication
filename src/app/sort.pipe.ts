import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SortPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      const itemTitle = item.firstName.toLowerCase();
      return itemTitle.includes(searchText);
    });
  }
}