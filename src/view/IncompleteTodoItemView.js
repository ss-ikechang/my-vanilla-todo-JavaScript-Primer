import { element } from "./html-util.js";

export class IncompleteTodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:number, completed: boolean})} onCompleteTodo 完了ボタンのクリックイベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onCompleteTodo, onDeleteTodo }) {
    const todoItemElement = element`<li><div class="list-row"><p class="todo-item">${todoItem.title}</p><button class="complete-button">完了</button><button class="delete-button">削除</button></div></li>`;

    // 完了ボタンがクリックされたときのイベントにリスナー関数を登録
    const completeButtonElement =
      todoItemElement.querySelector(".complete-button");
    completeButtonElement.addEventListener("click", () => {
      onCompleteTodo({ id: todoItem.id, title: todoItem.title });
    });

    // 削除ボタンがクリックされたときにincompleteTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector(".delete-button");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({ id: todoItem.id });
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
