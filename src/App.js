import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";
import { IncompleteTodoItemView } from "./view/IncompleteTodoItemView.js";
import { IncompleteTodoListView } from "./view/IncompleteTodoListView.js";
import { CompleteTodoListView } from "./view/CompleteTodoListView.js";

export class App {
  // 1. TodoListModelの初期化
  #incompleteTodoListModel = new TodoListModel();
  #completeTodoListModel = new TodoListModel();

  mount() {
    const formElement = document.getElementById("add-button");
    const inputElement = document.getElementById("add-text");
    const incomlpeteTodoContainerElement =
      document.getElementById("incomplete-list");
    const comlpeteTodoContainerElement =
      document.getElementById("complete-list");

    // 完了ボタンコールバック関数
    const onCompleteTodo = (props) => {
      const { id, title } = props;
      // 指定したTodoアイテムを完了にする→incompleteTodoListModelから削除し、completeTodoListModelに追加
      this.#incompleteTodoListModel.deleteTodo({
        id: id,
      });
      this.#completeTodoListModel.addTodo(
        new TodoItemModel({
          title: title,
          completed: true,
        })
      );
    };

    // 削除ボタンコールバック関数
    const onDeleteTodo = (props) => {
      const { id } = props;
      this.#incompleteTodoListModel.deleteTodo({
        id: id,
      });
    };

    // 戻るボタンコールバック関数
    const onBackTodo = (props) => {
      const { id, title } = props;
      // 指定したTodoアイテムを未完了にする→completeTodoListModelから削除し、incompleteTodoListModelに追加
      this.#completeTodoListModel.deleteTodo({
        id: id,
      });
      this.#incompleteTodoListModel.addTodo(
        new TodoItemModel({
          title: title,
          completed: false,
        })
      );
    };

    // 2-1. incompleteTodoListModelの状態が更新されたら表示を更新する
    this.#incompleteTodoListModel.onChange(() => {
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#incompleteTodoListModel.getTodoItems();
      const incompleteTodoListView = new IncompleteTodoListView();
      const todoListElement = incompleteTodoListView.createElement(todoItems, {
        onCompleteTodo,
        onDeleteTodo,
      });

      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, incomlpeteTodoContainerElement);
    });

    // 2-2. completeTodoListModelの状態が更新されたら表示を更新する
    this.#completeTodoListModel.onChange(() => {
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#completeTodoListModel.getTodoItems();
      const completeTodoListView = new CompleteTodoListView();
      const todoListElement = completeTodoListView.createElement(todoItems, {
        onBackTodo,
      });

      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, comlpeteTodoContainerElement);
    });

    formElement.addEventListener("click", (event) => {
      console.log(`入力欄の値: ${inputElement.value}`);
      // 新しいTodoItemをTodoListへ追加する
      this.#incompleteTodoListModel.addTodo(
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
