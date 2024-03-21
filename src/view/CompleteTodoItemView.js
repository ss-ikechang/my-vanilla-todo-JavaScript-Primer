import { element } from "./html-util.js";

export class CompleteTodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:number, completed: boolean})} onBackTodo 戻るボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onBackTodo }) {
    const todoItemElement = element`<li><div class="list-row"><p class="todo-item">${todoItem.title}</p><button class="back-button">戻る</button></div></li>`;

    // 戻るボタンがクリックされたときのイベントにリスナー関数を登録
    const backButtonElement = todoItemElement.querySelector(".back-button");
    backButtonElement.addEventListener("click", () => {
      onBackTodo({ id: todoItem.id, title: todoItem.title });
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
