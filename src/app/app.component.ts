import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit {
  title = "dict-pipe";

  dicts = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.dicts = this.mockData();
    let set = new Set(this.dicts.map(item => {
      return {
        category: item.category,
        value: item.value
      }
    }))
    console.log("dicts", set);
  }

  mockData(num = 20) {
    return Array.from({ length: num }, (v, i) => {
      let category = Math.floor(Math.random() * 10) % 2;
      let value = Math.floor(Math.random() * (category ? 3 : 5));
      return {
        title: `数据字典${i + 1}`,
        category: category ? "sex" : "singer",
        value: value,
      };
    });
  }
}
