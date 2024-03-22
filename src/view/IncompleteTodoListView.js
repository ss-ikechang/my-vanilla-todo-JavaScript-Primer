import { element } from "./html-util.js";
import { IncompleteTodoItemView } from "./IncompleteTodoItemView.js";

export class IncompleteTodoListView {
  /**
   * `todoItems`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:number, title: string})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(todoItems, { onCompleteTodo, onDeleteTodo }) {
    // TodoリストをまとめるList要素
    const todoListElement = element`<ul></ul>`;

    todoItems.forEach((item) => {
      // 未完了だけ表示する
      if (item.completed === false) {
        const incompleteTodoItemView = new IncompleteTodoItemView();
        const todoItemElement = incompleteTodoItemView.createElement(item, {
          onCompleteTodo,
          onDeleteTodo,
        });

        todoListElement.appendChild(todoItemElement);
      }
    });

    return todoListElement;
  }
}
