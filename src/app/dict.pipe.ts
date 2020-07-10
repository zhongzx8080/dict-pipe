import { Pipe, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// 数据字典缓存
const dictCache = {};

// 后台请求缓存(避免每次使用管道都请求后台)
const reqCache = {};

@Pipe({ name: "dict" })
export class DictPipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  async transform(value: any, args?: any) {
    // 自定义数据字典缓存key
    const key = `${value}==${args}`;
    dictCache[key] = dictCache[key] || this.getDictValue(args, value);
    return dictCache[key];
  }

  getDictValue(category, code) {
    // 判断是否已经发起过请求,避免重复请求
    reqCache[category] = reqCache[category] || this.requestDictionary(category);
    let req = reqCache[category] ;
    return new Promise((resolve, reject) => {
      req.then((arr) => {
        let name = this.getName(arr, code);
        resolve(name);
      });
    });
  }

  requestDictionary(category) {
    return new Promise((resolve, reject) => {
      // 模拟请求
      this.http
        .get(`assets/mock/dictionay.json?category=${category}`)
        .subscribe((arr) => {
          let dicts = [];
          if (Array.isArray(arr)) {
            dicts = arr.filter((item) => item.category == category);
          }
          resolve(dicts);
        });
    });
  }

  getName(arr, code) {
    let result = arr
      .filter((item) => item.code == code)
      .map((item) => item.name)
      .join(",");
    return result || "";
  }
}
