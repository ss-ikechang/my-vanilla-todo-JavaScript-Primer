import { element } from "./html-util.js";
import { CompleteTodoItemView } from "./CompleteTodoItemView.js";

export class CompleteTodoListView {
  /**
   * `todoItems`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(todoItems, { onBackTodo }) {
    // TodoリストをまとめるList要素
    const todoListElement = element`<ul></ul>`;

    todoItems.forEach((item) => {
      // 完了だけ表示する
      if (item.completed === true) {
        const completeTodoListView = new CompleteTodoItemView();
        const todoItemElement = completeTodoListView.createElement(item, {
          onBackTodo,
        });

        todoListElement.appendChild(todoItemElement);
      }
    });

    return todoListElement;
  }
}
