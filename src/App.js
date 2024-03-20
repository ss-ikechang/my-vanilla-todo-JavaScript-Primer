import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.getElementById("add-button");
    const inputElement = document.getElementById("add-text");
    const containerElement = document.getElementById("incomplete-list");

    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul></ul>`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        const todoItemElement = element`<li><div class="list-row"><p class="todo-item">${item.title}</p><button>完了</button><button>削除</button></div></li>`;

        todoListElement.appendChild(todoItemElement);
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
    });

    formElement.addEventListener("click", (event) => {
      console.log(`入力欄の値: ${inputElement.value}`);
      // 新しいTodoItemをTodoListへ追加する
      this.#todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
    });
  }
}
