import { element, render } from "./view/html-util.js";

export class App {
  mount() {
    const formElement = document.getElementById("add-button");
    const inputElement = document.getElementById("add-text");
    const containerElement = document.getElementById("incomplete-list");

    // TodoリストをまとめるList要素
    const todoListElement = element`<ul></ul>`;
    formElement.addEventListener("click", (event) => {
      console.log(`入力欄の値: ${inputElement.value}`);

      // 追加するTodoアイテムの要素(li要素)を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      // TodoアイテムをtodoListElementに追加する
      todoListElement.appendChild(todoItemElement);
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);

      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
    });
  }
}
